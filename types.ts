// Asegurar que las funciones globales están definidas
declare global {
    interface Window {
        renderMathInElement?: any;
        hljs?: {
            highlightElement: (el: HTMLElement) => void;
        };
    }
}

export interface IABlockParams {
    ia?: 'default' | 'dp' | 'cg' | 'c' | 'g';
    title?: string;
    content: string;
}
