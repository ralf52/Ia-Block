# Guía de Desarrollo

Esta guía explica la arquitectura del proyecto y cómo trabajar con el código de IA Block Generator.

## 🏗️ Arquitectura del proyecto

### Tecnologías utilizadas

- **TypeScript** - Lenguaje principal del proyecto
- **React** - Para los componentes de interfaz
- **esbuild** - Bundler para construir el proyecto
- **Obsidian API** - Para integrar con Obsidian

### Estructura de archivos

```
src/
├── Components/
│   ├── IABlockComponent.tsx  # Componente principal de React
│   └── Icons.tsx            # Iconos SVG locales
├── main.ts                  # Plugin principal de Obsidian
└── types.ts                 # Definiciones de tipos TypeScript
```

## 🔧 Componentes principales

### main.ts

El archivo principal del plugin que se ejecuta en Obsidian. Sus responsabilidades incluyen:

- Registrar el plugin con Obsidian
- Configurar el procesador de markdown
- Manejar la configuración del plugin
- Gestionar el ciclo de vida del plugin

### IABlockComponent.tsx

Componente de React que renderiza los bloques de IA. Características:

- Renderiza diferentes estilos según el modelo de IA
- Maneja la funcionalidad de expandir/contraer
- Implementa la función de copiar contenido
- Gestiona la accesibilidad

### Icons.tsx

Contiene todos los iconos SVG utilizados en el plugin:

- Iconos para cada modelo de IA
- Iconos de funcionalidad (copiar, expandir, etc.)
- Iconos optimizados y accesibles

## 🎨 Sistema de estilos

### Variables CSS

El plugin utiliza variables CSS para facilitar la personalización:

```css
:root {
    /* Colores principales */
    --ia-primary-color: #7a5af5;
    --ia-secondary-color: #b8a8ff;
    
    /* Fondos */
    --ia-bg-dark: linear-gradient(135deg, #1a1b26 0%, #16161e 100%);
    --ia-bg-light: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    
    /* Bordes */
    --ia-border-color: rgba(122, 90, 245, 0.2);
    
    /* Sombras */
    --ia-shadow: 0 4px 12px rgba(122, 90, 245, 0.15);
}
```

### Temas

El plugin soporta automáticamente temas claros y oscuros detectando las variables CSS de Obsidian.

## 🔄 Flujo de desarrollo

### 1. Modo desarrollo

```bash
npm run dev
```

Este comando:
- Compila TypeScript a JavaScript
- Genera los archivos CSS
- Configura el hot reload
- Monitorea cambios en los archivos

### 2. Construcción para producción

```bash
npm run build
```

Este comando:
- Optimiza el código para producción
- Minifica JavaScript y CSS
- Genera los archivos finales

### 3. Testing

```bash
npm run test
```

Ejecuta los tests unitarios (cuando estén configurados).

## 📝 Convenciones de código

### TypeScript

- Usar tipos estrictos
- Documentar interfaces complejas
- Evitar `any` cuando sea posible
- Usar enums para valores constantes

### React

- Componentes funcionales con hooks
- Props tipadas con TypeScript
- Manejo de estado local cuando sea necesario
- Componentes puros cuando sea posible

### CSS

- Usar variables CSS para colores y espaciado
- Seguir BEM para nombres de clases
- Mantener especificidad baja
- Usar flexbox/grid para layouts

## 🐛 Debugging

### Consola de Obsidian

Para ver logs y errores:

1. Abre Obsidian
2. Presiona `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Option+I` (Mac)
3. Ve a la pestaña "Console"

### Logs del plugin

```typescript
console.log('Mensaje de debug');
console.error('Error encontrado:', error);
```

### Breakpoints

Puedes usar breakpoints en el código TypeScript durante el desarrollo.

## 🧪 Testing

### Tests unitarios

Los tests deben cubrir:

- Funciones de utilidad
- Lógica de parsing
- Componentes de React
- Integración con Obsidian API

### Tests de integración

- Probar la sintaxis completa
- Verificar estilos en diferentes temas
- Comprobar funcionalidades interactivas

## 📦 Build y distribución

### Archivos de salida

El build genera:

- `main.js` - Código JavaScript principal
- `styles.css` - Estilos CSS
- `manifest.json` - Metadatos del plugin

### Optimizaciones

- Minificación de JavaScript
- Optimización de CSS
- Tree shaking para reducir tamaño
- Compresión de assets

## 🔄 Workflow de desarrollo

### 1. Crear una nueva funcionalidad

1. Crear una nueva rama desde `main`
2. Implementar la funcionalidad
3. Agregar tests si es necesario
4. Actualizar documentación
5. Crear un Pull Request

### 2. Corregir un bug

1. Reproducir el bug
2. Crear una rama para la corrección
3. Implementar la solución
4. Agregar tests para prevenir regresiones
5. Crear un Pull Request

### 3. Revisión de código

- Verificar que el código sigue las convenciones
- Comprobar que los tests pasan
- Validar que la documentación está actualizada
- Probar la funcionalidad en Obsidian

## 📚 Recursos adicionales

- [Documentación de Obsidian API](https://github.com/obsidianmd/obsidian-api)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de React](https://react.dev/)
- [Guía de esbuild](https://esbuild.github.io/) 