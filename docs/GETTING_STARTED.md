# Primeros Pasos

Esta guía te ayudará a configurar el entorno de desarrollo para contribuir al proyecto IA Block Generator.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Git**
- **Obsidian** (versión 1.1.0 o superior)

### Verificar instalaciones

```bash
node --version
npm --version
git --version
```

## 🚀 Configuración inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/ralf52/Ia-Block.git
cd Ia-Block
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno de desarrollo

```bash
npm run dev
```

Este comando iniciará el modo desarrollo con hot reload, lo que significa que los cambios se reflejarán automáticamente.

## 🧪 Probar el plugin

### 1. Construir para desarrollo

```bash
npm run build
```

### 2. Instalar en Obsidian

1. Copia los archivos generados (`main.js`, `styles.css`, `manifest.json`) a tu carpeta de plugins de Obsidian:
   ```
   {vault}/.obsidian/plugins/ia-block/
   ```

2. Reinicia Obsidian

3. Activa el plugin en **Configuración** → **Complementos de la comunidad**

### 3. Probar la funcionalidad

Crea una nueva nota en Obsidian y prueba la sintaxis:

```markdown
```ia-block
ia:cg title:Prueba
Este es un bloque de prueba para verificar que el plugin funciona correctamente.
```
```

## 🔧 Scripts disponibles

- `npm run dev` - Modo desarrollo con hot reload
- `npm run build` - Construcción para producción
- `npm run lint` - Verificar código con ESLint
- `npm run test` - Ejecutar tests (si están configurados)

## 📁 Estructura del proyecto

```
ia-block/
├── src/
│   ├── Components/
│   │   ├── IABlockComponent.tsx  # Componente principal de React
│   │   └── Icons.tsx            # Iconos SVG locales
│   ├── main.ts                  # Plugin principal de Obsidian
│   └── types.ts                 # Definiciones de tipos TypeScript
├── styles.css                   # Estilos CSS globales
├── manifest.json                # Metadatos del plugin
├── esbuild.config.mjs           # Configuración de build
├── package.json                 # Dependencias y scripts
└── docs/                        # Documentación
```

## 🐛 Solución de problemas

### Error: "Cannot find module"

Si encuentras errores de módulos no encontrados:

1. Elimina la carpeta `node_modules`
2. Elimina el archivo `package-lock.json`
3. Ejecuta `npm install` nuevamente

### Error: "Permission denied"

En sistemas Unix/Linux, puede que necesites permisos de administrador:

```bash
sudo npm install
```

### El plugin no aparece en Obsidian

1. Verifica que los archivos estén en la carpeta correcta
2. Asegúrate de que el `manifest.json` sea válido
3. Reinicia Obsidian completamente
4. Verifica la consola de Obsidian para errores

## 📚 Próximos pasos

Una vez que tengas el entorno configurado:

1. Lee la [Guía de desarrollo](DEVELOPMENT.md) para entender la arquitectura
2. Revisa la [Guía de contribución](CONTRIBUTING.md) para las mejores prácticas
3. Explora los [issues abiertos](https://github.com/ralf52/Ia-Block/issues) para encontrar tareas

## 🤝 Obtener ayuda

Si tienes problemas durante la configuración:

1. Revisa los [issues existentes](https://github.com/ralf52/Ia-Block/issues)
2. Crea un nuevo issue con detalles de tu problema
3. Únete a nuestra comunidad de desarrolladores 