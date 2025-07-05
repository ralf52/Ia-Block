import { createRoot } from 'react-dom/client';
import * as React from 'react';
import IABlockComponent from './Components/IABlockComponent';
import { Plugin, MarkdownPostProcessorContext, PluginSettingTab, App, Setting, MarkdownView } from 'obsidian';
import { IABlockParams } from './types';

// ============================================================================
// TIPOS Y CONSTANTES
// ============================================================================

/**
 * Configuración del plugin IA Block
 */
interface IABlockSettings {
    defaultExpanded: boolean;
}

/**
 * Configuración por defecto del plugin
 */
const DEFAULT_SETTINGS: IABlockSettings = {
    defaultExpanded: false,
};

/**
 * Tipos de IA soportados
 */
type IAType = 'default' | 'dp' | 'cg' | 'c' | 'g';

/**
 * Patrón regex para bloques inline de IA
 */
const INLINE_PATTERN = /\.\.\.\.\s*(.*?)\s*\.\.\.\./s;

// ============================================================================
// CLASE PRINCIPAL DEL PLUGIN
// ============================================================================

/**
 * Plugin principal para generar bloques estilizados de contenido IA
 */
export default class IABlockPlugin extends Plugin {
    // ========================================================================
    // PROPIEDADES
    // ========================================================================
    
    /** Configuración del plugin */
    settings: IABlockSettings;
    
    /** Patrón para detectar bloques inline */
    private readonly inlinePattern = INLINE_PATTERN;

    // ========================================================================
    // CICLO DE VIDA DEL PLUGIN
    // ========================================================================

    /**
     * Se ejecuta cuando el plugin se carga
     */
    async onload(): Promise<void> {
        console.log('IA Block Plugin cargado');
        
        // Cargar configuración
        await this.loadSettings();
        
        // Registrar pestaña de configuración
        this.addSettingTab(new IABlockSettingTab(this.app, this));

        // Registrar procesadores de markdown
        this.registerMarkdownProcessors();
    }

    /**
     * Se ejecuta cuando el plugin se desactiva
     */
    onunload(): void {
        console.log('IA Block Plugin desactivado');
        this.cleanupReactRoots();
    }

    // ========================================================================
    // REGISTRO DE PROCESADORES
    // ========================================================================

    /**
     * Registra todos los procesadores de markdown necesarios
     */
    private registerMarkdownProcessors(): void {
        // Procesador para bloques de código
        this.registerMarkdownCodeBlockProcessor('ia-block', (source, el, ctx) => {
            this.renderIABlock(source, el, ctx);
        });

        // Post-procesador para bloques inline
        this.registerMarkdownPostProcessor((el, ctx) => {
            this.processInlineBlocks(el, ctx);
        });
    }

    // ========================================================================
    // PROCESAMIENTO DE BLOQUES INLINE
    // ========================================================================

    /**
     * Procesa bloques inline de IA en el contenido
     */
    private processInlineBlocks(el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
        try {
            // Buscar bloques IA en elementos de párrafo
            const paragraphs = el.querySelectorAll('p');
            paragraphs.forEach(p => this.processParagraph(p));
            
            // Buscar bloques IA en elementos de código
            const codeElements = el.querySelectorAll(':not(pre) > code');
            codeElements.forEach(code => this.processCodeElement(code as HTMLElement));
        } catch (error) {
            console.error('Error procesando bloques inline:', error);
        }
    }

    /**
     * Procesa un párrafo en busca de bloques IA
     */
    private processParagraph(p: HTMLElement): void {
        const text = p.textContent;
        if (!text || !this.inlinePattern.test(text)) return;
        
        const match = text.match(this.inlinePattern);
        if (match && match[1]) {
            this.renderInlineIABlock(match[1], p);
        }
    }

    /**
     * Procesa un elemento de código en busca de bloques IA
     */
    private processCodeElement(code: HTMLElement): void {
        const content = code.textContent;
        if (!content || !this.inlinePattern.test(content)) return;
        
        const match = content.match(this.inlinePattern);
        if (match && match[1]) {
            this.renderInlineIABlock(match[1], code);
        }
    }

    // ========================================================================
    // PARSING DE PARÁMETROS
    // ========================================================================

    /**
     * Parsea los parámetros del bloque IA desde el texto de entrada
     */
    private parseParams(input: string): IABlockParams {
        const params: IABlockParams = { content: '' };
        
        try {
            const lines = input.split('\n');
            
            if (lines.length > 0) {
                const firstLine = lines[0];
                const paramRegex = /(\w+):\s*("([^"]+)"|([^\s]+))/g;
                let match;
                
                while ((match = paramRegex.exec(firstLine)) !== null) {
                    const key = match[1];
                    const value = match[3] || match[4]; // Maneja valores con/sin comillas
                    
                    this.setParamValue(params, key, value);
                }
                
                // Remover la primera línea si contenía parámetros
                if (paramRegex.test(firstLine)) {
                    lines.shift();
                }
            }
            
            params.content = lines.join('\n').trim();
        } catch (error) {
            console.error('Error parseando parámetros:', error);
            params.content = input.trim();
        }
        
        return params;
    }

    /**
     * Establece un valor de parámetro con validación
     */
    private setParamValue(params: IABlockParams, key: string, value: string): void {
        if (key === 'ia' && this.isValidIAType(value)) {
            params.ia = value as IAType;
        }
        if (key === 'title') {
            params.title = value;
        }
    }

    /**
     * Valida si un tipo de IA es válido
     */
    private isValidIAType(value: string): value is IAType {
        return ['default', 'dp', 'cg', 'c', 'g'].includes(value);
    }

    // ========================================================================
    // RENDERIZADO DE BLOQUES
    // ========================================================================

    /**
     * Renderiza un bloque IA desde código markdown
     */
    private renderIABlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
        try {
            const params = this.parseParams(source);
            this.renderWithReact(el, params);
        } catch (error) {
            console.error('Error renderizando bloque IA:', error);
            this.showError(el, 'Error al renderizar el bloque IA');
        }
    }

    /**
     * Renderiza un bloque IA inline
     */
    private renderInlineIABlock(content: string, el: HTMLElement): void {
        try {
            const params = this.parseParams(content);
            el.empty();
            this.renderWithReact(el, params);
        } catch (error) {
            console.error('Error renderizando bloque IA inline:', error);
            this.showError(el, 'Error al renderizar el bloque IA');
        }
    }

    /**
     * Renderiza el componente React
     */
    private renderWithReact(container: HTMLElement, params: IABlockParams): void {
        try {
            this.cleanupReactRoot(container);
            
            const root = createRoot(container);
            const component = React.createElement(IABlockComponent, {
                params: params,
                getLogoSVG: this.getLogoSVG.bind(this),
                getModelName: this.getModelName.bind(this),
                plugin: this
            });
            
            root.render(component);
            (container as any)._reactRoot = root;
        } catch (error) {
            console.error('Error renderizando componente React:', error);
            this.showError(container, 'Error al renderizar el componente');
        }
    }

    /**
     * Limpia un root de React específico
     */
    private cleanupReactRoot(container: HTMLElement): void {
        if ((container as any)._reactRoot) {
            try {
                (container as any)._reactRoot.unmount();
            } catch (error) {
                console.error('Error desmontando React root:', error);
            }
        }
    }

    /**
     * Limpia todos los roots de React
     */
    private cleanupReactRoots(): void {
        this.app.workspace.containerEl.findAll('.ia-response').forEach(el => {
            this.cleanupReactRoot(el);
        });
    }

    /**
     * Muestra un mensaje de error
     */
    private showError(el: HTMLElement, message: string): void {
        el.innerHTML = `<div class="ia-error">${message}</div>`;
    }

    // ========================================================================
    // UTILIDADES DE IA
    // ========================================================================

    /**
     * Obtiene el SVG del logo según el tipo de IA
     */
    private getLogoSVG(ia: string): string {
        const logos: Record<string, string> = {
            default: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m25.682 19.796l2.803-11.213L34.09 5.78l5.606 5.606l-5.606 5.606ZM34.09 5.78l-8.408 14.016" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M39.697 11.386L42.5 22.6v8.409l-2.803 8.409l-5.606 2.803l-8.41-5.606V19.796l5.607 8.409l2.803-11.213L42.5 22.6l-11.212 5.606l-5.606 8.409" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M25.682 36.614h8.409l8.409-5.606" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M36.894 25.402L34.09 36.614l-2.803-8.41m-8.969-8.408L19.515 8.583L13.91 5.78l-5.606 5.606l5.606 5.606ZM13.91 5.78l8.408 14.015" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.303 11.386L5.5 22.6v8.409l2.803 8.409l5.606 2.803l8.41-5.606V19.796l-5.607 8.409l-2.803-11.213L5.5 22.6l11.212 5.606l5.606 8.409" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M22.318 36.614H13.91L5.5 31.008" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.106 25.402l2.803 11.212l2.803-8.41" stroke-width="2"/></svg>`,
            dp: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" width="56.202" height="41.36" viewBox="0 0 14.87 10.943"><path d="M147.8 148.82c-.158-.077-.226.07-.318.145-.031.024-.058.056-.085.085-.23.245-.499.407-.85.388-.514-.03-.953.132-1.34.525-.083-.484-.357-.774-.773-.96-.218-.096-.439-.192-.592-.402-.106-.15-.135-.316-.189-.48-.034-.098-.068-.2-.181-.217-.124-.019-.172.085-.221.172a2.26 2.26 0 0 0-.262 1.14c.017.89.393 1.598 1.14 2.102.084.058.106.116.08.2-.052.174-.112.342-.166.516-.034.11-.084.135-.203.087a3.4 3.4 0 0 1-1.076-.73c-.53-.514-1.01-1.08-1.61-1.524q-.208-.155-.426-.292c-.61-.593.08-1.08.24-1.138.167-.06.058-.267-.482-.265s-1.035.183-1.665.424a2 2 0 0 1-.288.085 6 6 0 0 0-1.786-.063c-1.168.13-2.101.682-2.787 1.625-.824 1.133-1.018 2.42-.78 3.763.25 1.415.971 2.587 2.081 3.503 1.151.95 2.477 1.415 3.99 1.325.918-.053 1.94-.176 3.094-1.152.29.145.596.203 1.102.246.39.036.766-.02 1.057-.08.456-.096.424-.518.26-.595-1.336-.622-1.043-.369-1.31-.574.68-.802 1.702-1.637 2.102-4.339.031-.214.005-.35 0-.523-.002-.106.021-.147.143-.16.334-.038.659-.13.957-.293.865-.473 1.214-1.249 1.296-2.18.012-.142-.002-.289-.152-.363m-7.54 8.375c-1.293-1.017-1.921-1.352-2.18-1.338-.243.015-.199.292-.146.473.056.178.129.301.23.458.07.103.12.258-.07.373-.417.258-1.141-.086-1.175-.103-.843-.497-1.549-1.153-2.045-2.05a6.26 6.26 0 0 1-.805-2.776c-.012-.239.058-.323.296-.367.312-.058.635-.07.947-.024 1.321.193 2.445.783 3.388 1.719.538.533.945 1.169 1.364 1.79.446.661.926 1.29 1.537 1.806.215.181.388.319.552.42-.496.055-1.325.067-1.892-.381m.621-3.99a.19.19 0 0 1 .257-.178q.04.014.07.046a.2.2 0 0 1 .054.132.19.19 0 0 1-.192.19.19.19 0 0 1-.189-.19m1.927.989c-.124.05-.248.094-.366.099a.77.77 0 0 1-.495-.157c-.17-.142-.29-.222-.341-.47-.022-.106-.01-.27.01-.364.043-.203-.005-.333-.148-.45-.117-.097-.264-.124-.427-.124a.35.35 0 0 1-.157-.048c-.068-.034-.124-.118-.07-.222a.7.7 0 0 1 .118-.13c.22-.125.475-.084.71.01.218.09.383.253.62.485.243.28.287.356.425.566.109.164.208.333.276.526.041.12-.012.219-.155.28z" class="st0" style="stroke-width:.264583" transform="translate(-133.085 -147.902)"/></svg>`,
            c: `<svg version="1.1" viewBox="0 0 1322.9 1147.5" xmlns="http://www.w3.org/2000/svg"><path d="m711.19 265.2c-27.333 0-46.933 3.07-58.8 9.33 27.067-80.267 47.6-210.13 168-210.13 114.93 0 108.4 138.27 157.87 200.8zm107.33 112.93c-35.467 125.2-70 251.2-110.13 375.33-12.133 36.4-45.733 61.6-84 61.6h-136.27c9.3333-14 16.8-28.933 21.467-45.733 35.467-125.07 70-251.07 110.13-375.33 12.133-36.4 45.733-61.6 84-61.6h136.27c-9.3333 14-16.8 28.934-21.467 45.734m-316.13 704.8c-114.93 0-108.4-138.13-157.87-200.67h267.07c27.467 0 47.067-3.07 58.8-9.33-27.067 80.266-47.6 210-168 210m777.47-758.93h0.93c-32.667-38.266-82.267-57.866-146.67-57.866h-36.4c-34.533-2.8-65.333-26.134-76.533-58.8l-36.4-103.6c-21.463-61.737-80.263-103.74-145.73-103.74h-475.07c-175.6 0-251.2 225.07-292.27 361.33-38.267 127.07-126 341.73-24.267 462.13 46.667 55.067 116.67 57.867 183.07 57.867 34.533 2.8 65.333 26.133 76.533 58.8l36.4 103.6c21.467 61.733 80.267 103.73 145.6 103.73h475.2c175.47 0 251.07-225.07 292.27-361.33 30.8-100.8 68.133-224.93 66.267-324.8 0-50.534-11.2-100-42.933-137.33"/></svg>`,
            cg: "<svg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'><path d='m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z'/></svg>",
            g: `<svg height="1em" style="flex:none;line-height:1" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><defs>
                            <linearGradient id="gemminiGradiant" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#4285f4" />
                            <stop offset="100%" stop-color="#d96570" />
                            </linearGradient>
                            </defs>
                    <path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"></path></svg>`
        };

        const logo = logos[ia];
        if (!logo) {
            console.warn(`Logo no encontrado para IA: ${ia}`);
            return logos.default;
        }
        
        return logo;
    }

    /**
     * Obtiene el nombre del modelo según el tipo de IA
     */
    private getModelName(ia: string): string {
        const modelNames: Record<string, string> = {
            default: 'Asistente IA',
            dp: 'DeepSeek-R1',
            cg: 'ChatGPT',
            c: 'Copilot',
            g: 'Gemini'
        };

        return modelNames[ia] || modelNames.default;
    }

    // ========================================================================
    // GESTIÓN DE CONFIGURACIÓN
    // ========================================================================

    /**
     * Carga la configuración del plugin
     */
    async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    /**
     * Guarda la configuración del plugin
     */
    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }

    // ========================================================================
    // UTILIDADES PÚBLICAS
    // ========================================================================

    /**
     * Refresca todos los bloques IA en las vistas de Markdown
     */
    public refreshBlocks(): void {
        const leaves = this.app.workspace.getLeavesOfType('markdown');
        
        for (const leaf of leaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView) {
                this.refreshMarkdownView(view);
            }
        }
    }

    /**
     * Refresca una vista específica de Markdown
     */
    private refreshMarkdownView(view: MarkdownView): void {
        // Forzar re-render del preview si está en modo preview
        if (view.getMode && view.getMode() === 'preview') {
            (view as any).previewMode?.renderer?.render();
        } else if (view.editor) {
            // Si está en modo editor, forzar un cambio para refrescar el preview cuando se cambie
            view.editor.setValue(view.editor.getValue());
        }
    }
}

// ============================================================================
// PESTAÑA DE CONFIGURACIÓN
// ============================================================================

/**
 * Pestaña de configuración del plugin
 */
class IABlockSettingTab extends PluginSettingTab {
    plugin: IABlockPlugin;

    constructor(app: App, plugin: IABlockPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        
        // Título de la sección
        containerEl.createEl('h2', { text: 'Ajustes de IA Block Generator' });
        
        // Configuración de expansión por defecto
        new Setting(containerEl)
            .setName('Pestañas abiertas por defecto')
            .setDesc('Si está activado, los bloques IA estarán expandidos por defecto.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.defaultExpanded)
                .onChange(async (value) => {
                    this.plugin.settings.defaultExpanded = value;
                    await this.plugin.saveSettings();
                    this.plugin.refreshBlocks();
                })
            );
    }
}