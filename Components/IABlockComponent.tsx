import * as React from 'react';
import { MarkdownRenderer } from 'obsidian';
import { IABlockParams } from '../types';
import { Plugin } from 'obsidian';
import { CopyIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from './Icons';

interface IABlockProps {
    params: IABlockParams;
    getLogoSVG: (ia: string) => string;
    getModelName: (ia: string) => string;
    plugin: Plugin;
}

const IABlockComponent: React.FC<IABlockProps> = ({ 
    params, 
    getLogoSVG, 
    getModelName,
    plugin
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showNotification, setShowNotification] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Memoizar el contenido para evitar re-renders innecesarios
    const memoizedContent = React.useMemo(() => params.content, [params.content]);

    // Función para obtener la clase CSS según el tipo de IA
    const getIAClass = React.useCallback((ia: string): string => {
        switch(ia) {
            case 'dp': return 'ia-deepseek';
            case 'cg': return 'ia-chatgpt';
            case 'c': return 'ia-copilot';
            case 'g': return 'ia-gemini';
            default: return 'ia-default';
        }
    }, []);

    // Memoizar la clase CSS para evitar re-renders
    const iaClass = React.useMemo(() => {
        return getIAClass(params.ia || 'default');
    }, [getIAClass, params.ia]);

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
                
                // Post-procesamiento con verificación de nulidad
                setTimeout(() => {
                    if (!currentRef) return;
                    
                    // Renderizar ecuaciones matemáticas
                    if ((window as any).renderMathInElement) {
                        (window as any).renderMathInElement(currentRef, {
                            delimiters: [
                                {left: '$$', right: '$$', display: true},
                                {left: '$', right: '$', display: false}
                            ],
                            throwOnError: false
                        });
                    }
                    
                    // Resaltar sintaxis con verificación de nulidad y tipo correcto
                    if ((window as any).hljs) {
                        const codeBlocks = currentRef.querySelectorAll('pre code');
                        codeBlocks.forEach((el) => {
                            const htmlElement = el as HTMLElement;
                            (window as any).hljs.highlightElement(htmlElement);
                        });
                    }
                }, 10);
            } catch (error) {
                console.error('Error renderizando markdown:', error);
                currentRef.innerHTML = '<div class="ia-error">Error al renderizar el contenido</div>';
            }
        };

        renderContent();
    }, [memoizedContent, plugin, isExpanded]);

    const copyContent = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(memoizedContent);
            setIsCopied(true);
            setShowNotification(true);
            
            // Resetear el estado después de 2 segundos
            setTimeout(() => {
                setShowNotification(false);
                setTimeout(() => setIsCopied(false), 300); // Delay para la animación
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            // Fallback para navegadores que no soportan clipboard API
            try {
                const textArea = document.createElement('textarea');
                textArea.value = memoizedContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                setIsCopied(true);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    setTimeout(() => setIsCopied(false), 300);
                }, 2000);
            } catch (fallbackErr) {
                console.error('Error en fallback de copiado:', fallbackErr);
            }
        }
    }, [memoizedContent]);

    const toggleExpanded = React.useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Memoizar el logo SVG para evitar re-renders
    const logoSVG = React.useMemo(() => {
        return getLogoSVG(params.ia || 'default');
    }, [getLogoSVG, params.ia]);

    // Memoizar el nombre del modelo
    const modelName = React.useMemo(() => {
        return getModelName(params.ia || 'default');
    }, [getModelName, params.ia]);

     return (
        <div className={`ia-response ${isExpanded ? '' : 'content-hidden'} ${iaClass}`}>
            {/* Cabecera con logo y título */}
            <div className="ia-header">
                <div className="ia-container-header-text">
                    <div 
                        className="ia-logo" 
                        dangerouslySetInnerHTML={{ __html: logoSVG }} 
                    />
                    <h3 className="ia-title">
                        {params.title || 'Generado Con IA'}
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
                        onClick={toggleExpanded}
                        title={isExpanded ? 'Ocultar contenido' : 'Mostrar contenido'}
                    >
                        {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </button>
                    
                    <button 
                        className={`action-btn ${isCopied ? 'copied' : ''}`}
                        onClick={copyContent}
                        title={isCopied ? '¡Copiado!' : 'Copiar contenido'}
                        disabled={isCopied}
                    >
                        <CopyIcon />
                    </button>
                </div>
            </div>
            
            {/* Contenido colapsable */}
            {isExpanded && (
                <div 
                    ref={contentRef} 
                    className="ia-content"
                />
            )}
            
            {/* Notificación de copiado */}
            {showNotification && (
                <div className="notification">
                    <CheckCircleIcon /> ¡Contenido copiado!
                </div>
            )}
        </div>
    );
};

export default IABlockComponent;