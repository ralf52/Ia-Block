import * as React from 'react';
import { MarkdownRenderer } from 'obsidian';
import { IABlockParams } from '../types';
import { Plugin } from 'obsidian';
// import the required icons from './iconsBar'
import { ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckCircleIcon } from './iconsBar';

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
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [showNotification, setShowNotification] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const currentRef = contentRef.current;
        if (!currentRef) return;

        currentRef.innerHTML = '';
        MarkdownRenderer.renderMarkdown(
            params.content,
            currentRef,
            '',
            plugin
        );
        
        // Post-procesamiento con verificación de nulidad
        const timer = setTimeout(() => {
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
                    // Convertir Element a HTMLElement
                    const htmlElement = el as HTMLElement;
                    (window as any).hljs.highlightElement(htmlElement);
                });
            }
        }, 10);

        // Limpiar el timeout si el componente se desmonta
        return () => clearTimeout(timer);
    }, [params.content, plugin, isExpanded]);

    const copyContent = () => {
        navigator.clipboard.writeText(params.content)
            .then(() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            })
            .catch(err => console.error('Error al copiar:', err));
    };

   return (
        <div className={`ia-response ${isExpanded ? '' : 'content-hidden'}`}>
            <div className="ia-header">
                <div className="ia-container-header-text">
                    <div 
                        className="ia-logo" 
                        dangerouslySetInnerHTML={{ 
                            __html: getLogoSVG(params.ia || 'default') 
                        }} 
                    />
                    <h3 className="ia-title">
                        {params.title || 'Generado Con IA'}
                    </h3>
                </div>
                
                <div className="ia-type">
                    {getModelName(params.ia || 'default')}
                </div>

                <div className="ia-actions">
                    <button 
                        className="action-btn" 
                        onClick={copyContent}
                        title="Copiar contenido"
                    >
                        <CopyIcon />
                    </button>

                    <button 
                        className="action-btn" 
                        onClick={() => setIsExpanded(!isExpanded)}
                        title={isExpanded ? 'Ocultar contenido' : 'Mostrar contenido'}
                    >
                        {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </button>
                </div>
            </div>
            
            <div 
                ref={contentRef} 
                className="ia-content"
            />
            
            <div className={`notification ${showNotification ? 'show' : ''}`}>
                <CheckCircleIcon /> ¡Contenido copiado!
            </div>
        </div>
    );
};

export default IABlockComponent;