import * as React from 'react';
import { MarkdownRenderer } from 'obsidian';
import { IABlockParams } from '../types';
import IABlockPlugin from '../main';
import { CopyIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from './Icons';

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Props del componente IA Block
 */
interface IABlockProps {
    params: IABlockParams;
    getLogoSVG: (ia: string) => string;
    getModelName: (ia: string) => string;
    plugin: IABlockPlugin;
}

/**
 * Estados del componente
 */
interface IABlockState {
    isExpanded: boolean;
    showNotification: boolean;
    isCopied: boolean;
}

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Mapeo de tipos de IA a clases CSS
 */
const IA_CLASSES: Record<string, string> = {
    dp: 'ia-deepseek',
    cg: 'ia-chatgpt',
    c: 'ia-copilot',
    g: 'ia-gemini',
    default: 'ia-default'
};

/**
 * Tiempo de duración de la notificación de copiado (ms)
 */
const NOTIFICATION_DURATION = 2000;

/**
 * Delay para la animación de reset (ms)
 */
const ANIMATION_DELAY = 300;

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente principal para renderizar bloques de contenido IA
 */
const IABlockComponent: React.FC<IABlockProps> = ({ 
    params, 
    getLogoSVG, 
    getModelName,
    plugin
}) => {
    // ========================================================================
    // ESTADOS Y REFS
    // ========================================================================
    
    const [state, setState] = React.useState<IABlockState>(() => ({
        isExpanded: plugin?.settings?.defaultExpanded ?? false,
        showNotification: false,
        isCopied: false
    }));
    
    const contentRef = React.useRef<HTMLDivElement>(null);

    // ========================================================================
    // MEMOIZACIÓN
    // ========================================================================
    
    /** Contenido memoizado para evitar re-renders innecesarios */
    const memoizedContent = React.useMemo(() => params.content, [params.content]);
    
    /** Clase CSS memoizada según el tipo de IA */
    const iaClass = React.useMemo(() => IA_CLASSES[params.ia || 'default'], [params.ia]);
    
    /** Logo SVG memoizado */
    const logoSVG = React.useMemo(() => getLogoSVG(params.ia || 'default'), [getLogoSVG, params.ia]);
    
    /** Nombre del modelo memoizado */
    const modelName = React.useMemo(() => getModelName(params.ia || 'default'), [getModelName, params.ia]);

    // ========================================================================
    // EFECTOS
    // ========================================================================
    
    /**
     * Efecto para renderizar el contenido markdown
     */
    React.useEffect(() => {
        const currentRef = contentRef.current;
        if (!currentRef) return;

        const renderContent = async () => {
            try {
                currentRef.innerHTML = '';
                await MarkdownRenderer.renderMarkdown(
                    memoizedContent,
                    currentRef,
                    '',
                    plugin
                );
            } catch (error) {
                currentRef.innerHTML = '<div class="ia-error">Error al renderizar el contenido</div>';
            }
        };

        renderContent();
    }, [memoizedContent, plugin, state.isExpanded]);

    // ========================================================================
    // MANEJADORES DE EVENTOS
    // ========================================================================
    
    /**
     * Maneja la copia del contenido al portapapeles
     */
    const handleCopyContent = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(memoizedContent);
            setState(prev => ({ ...prev, isCopied: true, showNotification: true }));
            
            setTimeout(() => {
                setState(prev => ({ ...prev, showNotification: false }));
                setTimeout(() => {
                    setState(prev => ({ ...prev, isCopied: false }));
                }, ANIMATION_DELAY);
            }, NOTIFICATION_DURATION);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = memoizedContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            setState(prev => ({ ...prev, isCopied: true, showNotification: true }));
            setTimeout(() => {
                setState(prev => ({ ...prev, showNotification: false }));
                setTimeout(() => {
                    setState(prev => ({ ...prev, isCopied: false }));
                }, ANIMATION_DELAY);
            }, NOTIFICATION_DURATION);
        }
    }, [memoizedContent]);

    /**
     * Maneja el toggle de expansión/contracción
     */
    const handleToggleExpanded = React.useCallback(() => {
        setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
    }, []);

    // ========================================================================
    // RENDERIZADO
    // ========================================================================
    
    return (
        <div className={`ia-response ${state.isExpanded ? '' : 'content-hidden'} ${iaClass}`}>
            {/* Cabecera con logo y título */}
            <IAHeader 
                logoSVG={logoSVG}
                title={params.title}
                modelName={modelName}
                isExpanded={state.isExpanded}
                isCopied={state.isCopied}
                onToggleExpanded={handleToggleExpanded}
                onCopyContent={handleCopyContent}
            />
            
            {/* Contenido colapsable */}
            <div 
                ref={contentRef} 
                className="ia-content"
            />
            
            {/* Notificación de copiado */}
            {state.showNotification && (
                <IANotification />
            )}
        </div>
    );
};

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * Props para el componente de cabecera
 */
interface IAHeaderProps {
    logoSVG: string;
    title?: string;
    modelName: string;
    isExpanded: boolean;
    isCopied: boolean;
    onToggleExpanded: () => void;
    onCopyContent: () => void;
}

/**
 * Componente de cabecera del bloque IA
 */
const IAHeader: React.FC<IAHeaderProps> = ({
    logoSVG,
    title,
    modelName,
    isExpanded,
    isCopied,
    onToggleExpanded,
    onCopyContent
}) => (
    <div className="ia-header">
        {/* Contenedor de texto con logo y título */}
        <div className="ia-container-header-text">
            <div 
                className="ia-logo" 
                dangerouslySetInnerHTML={{ __html: logoSVG }} 
            />
            <h3 className="ia-title">
                {title || 'Generado Con IA'}
            </h3>
        </div>
        
        {/* Indicador del modelo de IA */}
        <div className="ia-type">
            {modelName}
        </div>
        
        {/* Acciones (expandir/contraer, copiar) */}
        <div className="ia-actions">
            <button 
                className="action-btn" 
                onClick={onToggleExpanded}
                title={isExpanded ? 'Ocultar contenido' : 'Mostrar contenido'}
            >
                {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </button>
            
            <button 
                className={`action-btn ${isCopied ? 'copied' : ''}`}
                onClick={onCopyContent}
                title={isCopied ? '¡Copiado!' : 'Copiar contenido'}
                disabled={isCopied}
            >
                <CopyIcon />
            </button>
            
            {/* Botón PDF Mode solo visible al imprimir */}
            <span className="action-mpdf">PDF Mode</span>
        </div>
    </div>
);

/**
 * Componente de notificación de copiado
 */
const IANotification: React.FC = () => (
    <div className="notification">
        <CheckCircleIcon /> ¡Contenido copiado!
    </div>
);

export default IABlockComponent;