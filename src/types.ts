// Asegurar que las funciones globales están definidas
declare global {
    interface Window {
        renderMathInElement?: any;
        hljs?: {
            highlightElement: (el: HTMLElement) => void;
        };
    }
}

// ============================================================================
// TIPOS PRINCIPALES
// ============================================================================

/**
 * Parámetros para un bloque de contenido IA
 */
export interface IABlockParams {
    /** Contenido del bloque (markdown) */
    content: string;
    
    /** Tipo de IA que generó el contenido */
    ia?: 'default' | 'dp' | 'cg' | 'c' | 'g';
    
    /** Título opcional del bloque */
    title?: string;
}

// ============================================================================
// TIPOS DE IA SOPORTADOS
// ============================================================================

/**
 * Tipos de IA soportados por el plugin
 */
export type IAType = 'default' | 'dp' | 'cg' | 'c' | 'g';

/**
 * Mapeo de tipos de IA a nombres legibles
 */
export const IA_MODEL_NAMES: Record<IAType, string> = {
    default: 'Asistente IA',
    dp: 'DeepSeek-R1',
    cg: 'ChatGPT',
    c: 'Copilot',
    g: 'Gemini'
} as const;

/**
 * Mapeo de tipos de IA a clases CSS
 */
export const IA_CSS_CLASSES: Record<IAType, string> = {
    default: 'ia-default',
    dp: 'ia-deepseek',
    cg: 'ia-chatgpt',
    c: 'ia-copilot',
    g: 'ia-gemini'
} as const;
