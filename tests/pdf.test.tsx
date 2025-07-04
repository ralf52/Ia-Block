import React from 'react';
import IABlockComponent from '../Components/IABlockComponent';
import { render } from '@testing-library/react';
import { Plugin } from 'obsidian';
import { IABlockParams } from '../types';
import IABlockPlugin from '../main';

// Mock de las funciones del plugin
const mockPlugin = {
    app: {
        workspace: {
            containerEl: {
                findAll: jest.fn()
            }
        }
    },
    settings: {
        defaultExpanded: false
    },
    inlinePattern: /\.\.\.\.\s*(.*?)\s*\.\.\.\./s,
    processInlineBlocks: jest.fn(),
    processParagraph: jest.fn(),
    processCodeElement: jest.fn(),
    parseParams: jest.fn(),
    renderIABlock: jest.fn(),
    renderInlineIABlock: jest.fn(),
    renderWithReact: jest.fn(),
    getLogoSVG: jest.fn(),
    getModelName: jest.fn(),
    loadSettings: jest.fn(),
    saveSettings: jest.fn(),
    onload: jest.fn(),
    onunload: jest.fn()
} as unknown as IABlockPlugin;

// Mock de las funciones SVG
const mockGetLogoSVG = jest.fn();
const mockGetModelName = jest.fn();

// Helper para mockear matchMedia con valor dinámico
defineMatchMedia((matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

function defineMatchMedia(setMatches: (matches: boolean) => void) {
    // No-op, solo para claridad en el test
}

test('debe mostrar contenido en modo PDF incluso cuando está colapsado', () => {
    // Simular modo impresión
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    const params: IABlockParams = {
        content: '## Contenido de prueba\nEste es un bloque de IA',
        ia: 'dp'
    };

    const { container, getByText } = render(
        <IABlockComponent 
            params={params}
            getLogoSVG={mockGetLogoSVG}
            getModelName={mockGetModelName}
            plugin={mockPlugin}
        />
    );

    // Verificar que el botón PDF Mode es visible
    const pdfButton = container.querySelector('.action-mpdf');
    expect(pdfButton).toBeVisible();
    expect(pdfButton).toHaveTextContent('PDF Mode');

    // Verificar que el contenido está visible
    const content = container.querySelector('.ia-content');
    expect(content).toBeVisible();
    // Usar toContainHTML solo si está disponible, si no, usar toContainHTML de jest-dom
    expect(content?.innerHTML).toContain('<h2>Contenido de prueba</h2>');
});

test('debe mostrar botones normales en modo no-impresión', () => {
    // Simular modo normal (no impresión)
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    const params: IABlockParams = {
        content: 'Contenido normal',
        ia: 'default'
    };

    const { container } = render(
        <IABlockComponent 
            params={params}
            getLogoSVG={mockGetLogoSVG}
            getModelName={mockGetModelName}
            plugin={mockPlugin}
        />
    );

    // Verificar que el botón PDF está oculto
    const pdfButton = container.querySelector('.action-mpdf');
    expect(pdfButton).not.toBeVisible();

    // Verificar que los botones normales están visibles
    const normalButtons = container.querySelectorAll('.action-btn');
    expect(normalButtons.length).toBe(2);
    expect(normalButtons[0]).toBeVisible();
    expect(normalButtons[1]).toBeVisible();
}); 