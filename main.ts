import { createRoot, Root } from 'react-dom/client';
import * as React from 'react';
import IABlockComponent from './Components/IABlockComponent';
import { Plugin } from 'obsidian';
import { IABlockParams } from './types';

const IA_BLOCK_REGEX = /\.\.\.\.\s*(.*?)\s*\.\.\.\./s;

export default class IABlockPlugin extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor('ia-block', (source, el) => {
            this.renderIABlock(source, el);
        });

        this.registerMarkdownPostProcessor((el) => {
            el.findAll('p').forEach((p) => {
                const text = p.textContent;
                const match = text?.match(IA_BLOCK_REGEX);
                
                if (match && match[1]) {
                    this.renderInlineIABlock(match[1], p);
                }
            });
        });
    }

    private parseParams(input: string): IABlockParams {
        const params: IABlockParams = { content: '' };
        const lines = input.split('\n');
        
        if (lines.length > 0) {
            const firstLine = lines[0];
            const paramRegex = /(\w+):\s*("([^"]+)"|([^\s]+))/g;
            let match;
            
            while ((match = paramRegex.exec(firstLine)) !== null) {
                const key = match[1];
                const value = match[3] || match[4]; // Maneja valores con/sin comillas
                
                if (key === 'ia' && ['dp', 'cg', 'c'].includes(value)) {
                    params.ia = value as 'dp' | 'cg' | 'c';
                }
                if (key === 'title') {
                    params.title = value;
                }
            }
            
            if (paramRegex.test(firstLine)) {
                lines.shift();
            }
        }
        
        params.content = lines.join('\n').trim();
        return params;
    }

    private renderIABlock(source: string, el: HTMLElement) {
        const params = this.parseParams(source);
        this.renderWithReact(el, params);
    }

    private renderInlineIABlock(content: string, el: HTMLElement) {
        const params = this.parseParams(content);
        el.empty();
        this.renderWithReact(el, params);
    }

    private renderWithReact(container: HTMLElement, params: IABlockParams) {
        if ((container as any)._reactRoot) {
            (container as any)._reactRoot.unmount();
        }
        
        const root = createRoot(container);
        
        // Convertir JSX a React.createElement
        const component = React.createElement(
            IABlockComponent,
            {
                params: params,
                getLogoSVG: this.getLogoSVG.bind(this),
                getModelName: this.getModelName.bind(this),
                plugin: this
            }
        );
        
        root.render(component);
        
        (container as any)._reactRoot = root;
    }

    onunload() {
        this.app.workspace.containerEl.findAll('.ia-response').forEach(el => {
            if ((el as any)._reactRoot) {
                (el as any)._reactRoot.unmount();
            }
        });
    }
    
    private getLogoSVG(ia: string): string {
        if (ia === 'dp') {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill="#7a5af5" fill-rule="evenodd" d="M4.382.824c.798 0 1.513.357 1.993.92v4.563c-.017.205-.133.633-.4 1.023c-.265.385-.635.678-1.144.734a.625.625 0 1 0 .139 1.243a2.7 2.7 0 0 0 1.405-.585v3.67a2.997 2.997 0 0 1-5.336-1.389c.114-.351.3-.654.478-.795a.625.625 0 1 0-.775-.98a2 2 0 0 0-.259.244A5.65 5.65 0 0 1 0 7.234c0-.974.312-1.931.822-2.636c.11.213.242.4.384.562c.369.42.83.692 1.189.774a.625.625 0 0 0 .277-1.219c-.057-.013-.298-.119-.527-.38c-.184-.21-.343-.5-.382-.89v-.003A2.62 2.62 0 0 1 4.382.824m5.615 12.732a3 3 0 0 1-2.372-1.164V6.548c.256.186.528.338.792.45a.625.625 0 1 0 .486-1.153c-.553-.233-1.062-.685-1.24-1.1l-.038-.074V1.744a2.618 2.618 0 0 1 4.596 1.982l.002.001c-.063.41-.23.788-.41.965a.625.625 0 1 0 .878.89a2.5 2.5 0 0 0 .557-.883c.468.693.752 1.606.752 2.535c0 1.09-.39 2.394-1.01 3.066l-.023-.001a1.7 1.7 0 0 1-.476-.11c-.363-.136-.801-.42-1.183-.975a.625.625 0 1 0-1.03.71c.53.77 1.178 1.211 1.773 1.435c.265.1.531.16.778.183a3 3 0 0 1-2.832 2.014" clip-rule="evenodd"/></svg>`;
        }
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#7a5af5"/><path fill="white" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17" stroke="white" stroke-width="2"/></svg>`;
    }

    private getModelName(ia: string): string {
        switch(ia) {
            case 'dp': return 'DeepSeek-R1';
            case 'cg': return 'ChatGPT';
            case 'c': return 'Copilot';
            default: return 'Asistente IA';
        }
    }
}