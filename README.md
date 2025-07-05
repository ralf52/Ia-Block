# IA Block Generator

Un plugin para Obsidian que crea bloques estilizados para contenido generado por IA con soporte para múltiples modelos.

## ✨ Características

- **Múltiples modelos de IA**: Soporte para DeepSeek, ChatGPT, Copilot, Gemini y más
- **Bloques de código**: Sintaxis simple para crear bloques IA
- **Bloques inline**: Integración directa en el texto
- **Iconos locales**: Sin dependencias externas
- **Temas adaptativos**: Soporte completo para modo oscuro y claro
- **Accesibilidad**: Compatible con lectores de pantalla
- **Responsive**: Diseño adaptativo para móviles
- **Copiado inteligente**: Con fallback para navegadores antiguos

## 🚀 Instalación

### Desde Obsidian
1. Ve a **Configuración** → **Complementos de la comunidad**
2. Desactiva **Modo seguro**
3. Haz clic en **Explorar**
4. Busca "IA Block Generator"
5. Haz clic en **Instalar**

### Instalación manual
1. Descarga el archivo `.zip` de la última versión
2. Extrae el archivo en tu carpeta de plugins de Obsidian
3. Activa el plugin en **Configuración** → **Complementos de la comunidad**

## 📖 Uso

### Bloques de código

Crea bloques IA usando la sintaxis de código de Obsidian:

```markdown
```ia-block
ia: dp
title: "Análisis de datos"

Este es el contenido generado por DeepSeek-R1.
Puede incluir **markdown** completo.
```
```

### Bloques inline

Usa la sintaxis especial para bloques inline:

```markdown
.... ia: cg title: "Resumen" Este es un resumen generado por ChatGPT ....
```

### Parámetros disponibles

| Parámetro | Descripción | Valores |
|-----------|-------------|---------|
| `ia` | Tipo de IA | `default`, `dp`, `cg`, `c`, `g` |
| `title` | Título del bloque | Cualquier texto |

### Modelos soportados

- **`default`** - Asistente IA genérico
- **`dp`** - DeepSeek-R1
- **`cg`** - ChatGPT
- **`c`** - Copilot
- **`g`** - Gemini

## 🎨 Personalización

### Variables CSS

Puedes personalizar los colores editando las variables CSS en tu tema:

```css
:root {
    --ia-primary-color: #7a5af5;
    --ia-secondary-color: #b8a8ff;
    --ia-bg-dark: linear-gradient(135deg, #1a1b26 0%, #16161e 100%);
    --ia-bg-light: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
```

### Funcionalidades

- **Expandir/Contraer**: Haz clic en el botón de chevron para mostrar/ocultar contenido
- **Copiar**: Haz clic en el botón de copiar para copiar todo el contenido
- **Notificaciones**: Feedback visual cuando se copia el contenido

## 🔧 Desarrollo

### Requisitos

- Node.js 16+
- npm o yarn

### Instalación de dependencias

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Estructura del proyecto

```
├── src/
│   ├── Components/
│   │   ├── IABlockComponent.tsx  # Componente principal
│   │   └── Icons.tsx            # Iconos SVG locales
│   ├── main.ts                  # Plugin principal
│   └── types.ts                 # Definiciones de tipos
├── styles.css              # Estilos CSS
├── manifest.json           # Metadatos del plugin
├── esbuild.config.mjs      # Configuración de build
└── package.json            # Dependencias
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Obsidian](https://obsidian.md) por la plataforma
- [React](https://reactjs.org) por el framework de UI
- La comunidad de Obsidian por el soporte

## 📞 Soporte

Si tienes problemas o sugerencias:

1. Revisa los [issues existentes](https://github.com/tuusuario/obsidian-ia-block/issues)
2. Crea un nuevo issue con detalles del problema
3. Incluye información sobre tu sistema y versión de Obsidian

## 🔄 Changelog

### v1.0.0
- Lanzamiento inicial
- Soporte para múltiples modelos de IA
- Bloques de código e inline
- Iconos locales
- Temas adaptativos
- Accesibilidad mejorada

---

**¿Te gusta este plugin? ¡Considera darle una ⭐ en GitHub!**
