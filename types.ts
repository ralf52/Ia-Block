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
    ia?: 'dp' | 'cg' | 'c' | 'g' | 'default'; // Añade 'g' aquí
    title?: string;
    content: string;
}
