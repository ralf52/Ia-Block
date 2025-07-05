# Estructura CSS del Plugin IA Block

Esta carpeta contiene todos los estilos CSS organizados de forma modular para facilitar el mantenimiento y desarrollo.

## Estructura de Archivos

### `index.css`
Archivo principal que importa todos los demás archivos CSS en el orden correcto.

### `variables.css`
Contiene las variables CSS (custom properties) y el reset básico.
- Variables de colores para temas claro y oscuro
- Variables de espaciado y tipografía
- Reset CSS básico

### `base.css`
Estilos base del plugin IA Block.
- Estructura principal del bloque `.ia-response`
- Header y logo
- Contenido básico
- Estados de contenido (oculto/mostrado)
- Animaciones y transiciones
- Accesibilidad

### `markdown.css`
Estilos para el contenido Markdown renderizado.
- Encabezados (h1, h2, h3)
- Párrafos y enlaces
- Listas y blockquotes
- Tablas
- Código (pre, code)
- Matemáticas con KaTeX
- Secciones de información

### `actions.css`
Estilos para botones de acción y notificaciones.
- Botones de acción (copiar, ocultar, etc.)
- Estados de botones (hover, focus, disabled)
- Notificaciones
- Mensajes de error
- Estilos para impresión

### `themes.css`
Estilos específicos para cada tipo de IA.
- `.ia-default` - Asistente IA por defecto
- `.ia-copilot` - GitHub Copilot
- `.ia-chatgpt` - ChatGPT
- `.ia-deepseek` - DeepSeek
- `.ia-gemini` - Google Gemini

### `responsive.css`
Media queries y diseño responsive.
- Breakpoints para móviles
- Ajustes para tablets
- Optimizaciones para pantallas grandes
- Orientación landscape

### `legacy.css`
Estilos legacy del archivo original que no se han migrado completamente.
- Estilos de contenedor y layout
- Estilos de header y footer
- Algunos estilos duplicados para compatibilidad

## Orden de Importación

El orden de importación en `index.css` es importante:

1. `variables.css` - Variables CSS deben ir primero
2. `base.css` - Estilos base
3. `markdown.css` - Contenido Markdown
4. `actions.css` - Botones y notificaciones
5. `themes.css` - Temas específicos
6. `responsive.css` - Media queries
7. `legacy.css` - Estilos legacy al final

## Build Process

Durante el build, esbuild:
1. Lee `src/styles/index.css`
2. Procesa todos los `@import`
3. Combina todos los archivos CSS
4. Minifica el resultado
5. Genera `styles.css` en la raíz del proyecto

## Desarrollo

Para desarrollo:
- Edita los archivos individuales en `src/styles/`
- El build automático regenerará `styles.css`
- Los cambios se reflejan inmediatamente en modo watch

## Convenciones

- Usar variables CSS cuando sea posible
- Mantener especificidad baja
- Comentar secciones importantes
- Seguir el orden de importación
- Evitar duplicación de estilos 