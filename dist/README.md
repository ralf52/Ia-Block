# IA Block Generator Plugin para Obsidian

Un plugin para Obsidian que permite crear bloques estilizados para contenido generado por IA con diferentes temas y modelos.

## Características

- **Múltiples modelos de IA**: Soporte para DeepSeek-R1, ChatGPT, Copilot, Gemini y un modelo por defecto
- **Temas personalizables**: Cada modelo tiene su propio esquema de colores
- **Renderizado de Markdown**: Soporte completo para Markdown, matemáticas (KaTeX) y resaltado de sintaxis
- **Funcionalidades interactivas**: Copiar contenido y expandir/contraer bloques
- **Modo oscuro/claro**: Compatible con los temas de Obsidian
- **Build optimizado**: CSS combinado automáticamente para mejor rendimiento

## Instalación

### Instalación Manual

1. Descarga los archivos de la carpeta `dist/` de este repositorio
2. Crea una carpeta llamada `ia-block` en tu directorio de plugins de Obsidian:
   ```
   .obsidian/plugins/ia-block/
   ```
3. Coloca los archivos descargados en esa carpeta
4. Reinicia Obsidian y activa el plugin en Configuración > Plugins

### Archivos necesarios para la instalación

- `main.js` - Plugin compilado
- `manifest.json` - Configuración del plugin
- `styles.css` - Estilos combinados (incluye todos los temas)
- `README.md` - Documentación
- `example.md` - Ejemplos de uso

## Uso

### Bloques de código

Usa bloques de código con el identificador `ia-block`:

````markdown
```ia-block
ia: dp
title: Respuesta de DeepSeek
Este es el contenido generado por IA.
Puede incluir **markdown** y `código`.
```
````

### Bloques inline

Usa la sintaxis `++++` para bloques inline:

```markdown
++++
ia: cg
title: Respuesta de ChatGPT
Contenido generado por ChatGPT.
++++
```

### Modelos disponibles

- `ia: default` - Modelo por defecto (púrpura)
- `ia: dp` - DeepSeek-R1 (azul)
- `ia: cg` - ChatGPT (verde)
- `ia: c` - Copilot (azul Microsoft)
- `ia: g` - Gemini (azul Google)

## Desarrollo

### Requisitos

- Node.js 16+
- npm

### Instalación de dependencias

```bash
npm install
```

### Comandos disponibles

```bash
# Desarrollo (archivos CSS separados)
npm run dev

# Build de producción (CSS combinado)
npm run build

# Build solo CSS
npm run build:css

# Distribución completa
npm run distribute

# Limpiar archivos generados
npm run clean
```

### Estructura del proyecto

```
ia-block/
├── main.ts                 # Código fuente principal
├── Components/             # Componentes React
│   ├── IABlockComponent.tsx
│   └── iconsBar.tsx
├── styles/                 # Archivos CSS separados (desarrollo)
│   ├── styles.css          # Estilos principales
│   ├── default.css         # Tema por defecto
│   ├── dp.css             # Tema DeepSeek
│   ├── cg.css             # Tema ChatGPT
│   ├── c.css              # Tema Copilot
│   └── g.css              # Tema Gemini
├── dist/                   # Archivos de distribución (generados)
│   ├── main.js
│   ├── manifest.json
│   ├── styles.css          # CSS combinado
│   ├── README.md
│   └── example.md
├── esbuild.config.mjs      # Configuración de build
├── distribute.mjs          # Script de distribución
└── package.json
```

### Sistema de Build

El plugin utiliza un sistema de build inteligente:

- **Desarrollo**: Los archivos CSS se mantienen separados para facilitar el desarrollo
- **Producción**: Todos los archivos CSS se combinan automáticamente en un solo archivo `styles.css`
- **Detección automática**: El plugin detecta automáticamente si está en modo desarrollo o producción

## Solución de problemas

### Error: "Archivo CSS no encontrado"

Si ves este error en la consola, el plugin cargará automáticamente estilos de respaldo. Esto es normal y no afecta la funcionalidad.

### El plugin no se carga

1. Verifica que el archivo `main.js` esté presente en la carpeta del plugin
2. Asegúrate de que el `manifest.json` tenga el ID correcto: `ia-block`
3. Reinicia Obsidian completamente
4. Verifica la consola del desarrollador para errores específicos

### Problemas de build

```bash
# Limpiar y reconstruir
npm run clean
npm run build

# Verificar que todos los archivos CSS existen
ls -la styles/
```

## Licencia

MIT License

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias y mejoras.
