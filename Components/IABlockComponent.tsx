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
                
                <div className="ia-type">
                    {modelName}
                </div>
                
                <div className="ia-actions">
                    <button 
                        className="action-btn" 
                        onClick={toggleExpanded}
                        title={isExpanded ? 'Ocultar contenido' : 'Mostrar contenido'}
                        aria-label={isExpanded ? 'Ocultar contenido' : 'Mostrar contenido'}
                    >
                        {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </button>
                    
                    <button 
                        className={`action-btn ${isCopied ? 'copied' : ''}`}
                        onClick={copyContent}
                        title={isCopied ? '¡Copiado!' : 'Copiar contenido'}
                        aria-label={isCopied ? '¡Copiado!' : 'Copiar contenido'}
                        disabled={isCopied}
                    >
                        <CopyIcon />
                    </button>

                     <div className='action-mpdf'>
                        <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                            <path fillRule="nonzero" d="M256 0c70.686 0 134.69 28.658 181.016 74.984C483.342 121.31 512 185.314 512 256c0 70.686-28.658 134.69-74.984 181.016C390.69 483.342 326.686 512 256 512c-70.686 0-134.69-28.658-181.016-74.984C28.658 390.69 0 326.686 0 256c0-70.686 28.658-134.69 74.984-181.016C121.31 28.658 185.314 0 256 0z"/>
                            <path d="M256 29.464c125.114 0 226.536 101.422 226.536 226.536S381.114 482.536 256 482.536 29.464 381.114 29.464 256 130.886 29.464 256 29.464z"/>
                            <path fillRule="nonzero" d="M275.55 302.281c-.88 22.063-38.246 22.092-39.1-.007-3.778-37.804-13.443-127.553-13.135-163.074.311-10.946 9.383-17.426 20.989-19.898 3.578-.765 7.513-1.136 11.477-1.132 3.986.007 7.932.4 11.514 1.165 11.988 2.554 21.401 9.301 21.398 20.444l-.045 1.117-13.098 161.385zM256 341.492c14.453 0 26.168 11.717 26.168 26.171 0 14.453-11.715 26.167-26.168 26.167s-26.171-11.714-26.171-26.167c0-14.454 11.718-26.171 26.171-26.171z"/>
                        </svg>
                        <span>PDF Mode</span>
                    </div>

                </div>
            </div>
            
            <div 
                ref={contentRef} 
                className="ia-content"
                aria-hidden={!isExpanded}
            />
            
            <div 
                className={`notification ${showNotification ? 'show' : ''}`}
                role="status"
                aria-live="polite"
            >
                <CheckCircleIcon /> ¡Contenido copiado!
            </div>
        </div>
    );
};

export default IABlockComponent;