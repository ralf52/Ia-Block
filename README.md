# IA Block Generator

Un plugin para Obsidian que crea bloques estilizados y visualmente atractivos para contenido generado por IA, con soporte para múltiples modelos y una interfaz moderna.

## ✨ Características

- **🎨 Diseño moderno**: Bloques estilizados con gradientes y efectos visuales
- **🤖 Múltiples modelos de IA**: Soporte para DeepSeek, ChatGPT, Copilot, Gemini y más
- **📝 Sintaxis simple**: Fácil de usar con bloques de código markdown
- **🌙 Temas adaptativos**: Soporte completo para modo oscuro y claro
- **♿ Accesibilidad**: Compatible con lectores de pantalla y navegación por teclado
- **📱 Responsive**: Diseño adaptativo para diferentes tamaños de pantalla
- **📋 Copiado inteligente**: Función de copiar con feedback visual
- **⚙️ Configurable**: Opciones personalizables en la configuración
- **🚀 Sin dependencias externas**: Iconos y estilos incluidos localmente

## 🚀 Instalación

### Desde Obsidian (Recomendado)
1. Abre **Configuración** en Obsidian
2. Ve a **Complementos de la comunidad**
3. Desactiva **Modo seguro** si está activado
4. Haz clic en **Explorar**
5. Busca "IA Block Generator"
6. Haz clic en **Instalar** y luego **Activar**

### Instalación manual
1. Descarga el archivo `.zip` de la [última versión](https://github.com/tuusuario/obsidian-ia-block/releases)
2. Extrae el contenido en tu carpeta de plugins de Obsidian:
   ```
   {vault}/.obsidian/plugins/ia-block-generator/
   ```
3. Reinicia Obsidian
4. Activa el plugin en **Configuración** → **Complementos de la comunidad**

## 📖 Uso

### Sintaxis básica

Crea bloques IA usando la sintaxis de código de Obsidian:

```markdown
```ia-block
ia: dp
title: "Análisis de datos"

Este es el contenido generado por DeepSeek-R1.
Puede incluir **markdown** completo, listas, enlaces y más.
```
```

### Parámetros disponibles

| Parámetro | Descripción | Valores válidos | Ejemplo |
|-----------|-------------|-----------------|---------|
| `ia` | Tipo de IA | `default`, `dp`, `cg`, `c`, `g` | `ia: dp` |
| `title` | Título del bloque | Cualquier texto | `title: "Mi análisis"` |

### Modelos de IA soportados

| Código | Modelo | Descripción |
|--------|--------|-------------|
| `default` | Asistente IA | Modelo genérico con icono de IA |
| `dp` | DeepSeek-R1 | Modelo de DeepSeek con logo oficial |
| `cg` | ChatGPT | Modelo de OpenAI con logo oficial |
| `c` | Copilot | Modelo de Microsoft con logo oficial |
| `g` | Gemini | Modelo de Google con logo oficial |

### Ejemplos de uso

#### Análisis de datos con DeepSeek
```markdown
```ia-block
ia: dp
title: "Análisis de ventas Q4"

Los datos muestran un incremento del 23% en ventas comparado con Q3.
Los productos más vendidos fueron:
- Producto A: 1,250 unidades
- Producto B: 890 unidades
- Producto C: 567 unidades

**Recomendación**: Continuar con la estrategia actual.
```
```

#### Resumen con ChatGPT
```markdown
```ia-block
ia: cg
title: "Resumen ejecutivo"

Este documento presenta un análisis completo de la situación actual
del mercado y las oportunidades de crecimiento identificadas.
```
```

#### Código con Copilot
```markdown
```ia-block
ia: c
title: "Función de validación"

```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```
```
```

## 🎨 Personalización

### Configuración del plugin

Ve a **Configuración** → **Complementos de la comunidad** → **IA Block Generator** para ajustar:

- **Pestañas abiertas por defecto**: Controla si los bloques aparecen expandidos inicialmente

### Personalización de estilos

Puedes personalizar los colores editando las variables CSS en tu tema personalizado:

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

### Funcionalidades interactivas

- **📖 Expandir/Contraer**: Haz clic en el botón de chevron (▼/▶) para mostrar/ocultar contenido
- **📋 Copiar**: Haz clic en el botón de copiar para copiar todo el contenido al portapapeles
- **🔔 Notificaciones**: Feedback visual cuando se copia el contenido exitosamente

## 🔧 Desarrollo

### Requisitos del sistema

- **Node.js**: Versión 16 o superior
- **npm**: Gestor de paquetes de Node.js
- **Obsidian**: Versión 1.0.0 o superior

### Configuración del entorno

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/obsidian-ia-block.git
   cd obsidian-ia-block
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construye para producción**:
   ```bash
   npm run build
   ```

### Estructura del proyecto

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
└── README.md                    # Este archivo
```

### Scripts disponibles

- `npm run dev`: Modo desarrollo con hot reload
- `npm run build`: Construcción para producción
- `npm run version-bump`: Incrementa la versión del plugin

## 🤝 Contribuir

¡Tus contribuciones son bienvenidas! Para contribuir:

1. **Fork** el repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realiza tus cambios** y haz commit:
   ```bash
   git commit -m 'feat: añadir nueva funcionalidad'
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abre un Pull Request** con una descripción detallada

### Guías de contribución

- Mantén el código limpio y bien documentado
- Añade tests para nuevas funcionalidades
- Sigue las convenciones de commit semántico
- Actualiza la documentación cuando sea necesario

## 📝 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para detalles completos.

## 🙏 Agradecimientos

- **[Obsidian](https://obsidian.md)** por proporcionar una plataforma increíble para plugins
- **[React](https://reactjs.org)** por el framework de UI que hace posible componentes interactivos
- **La comunidad de Obsidian** por el soporte continuo y feedback
- **Los desarrolladores de los modelos de IA** por hacer posible esta tecnología

## 📞 Soporte y ayuda

### Antes de reportar un problema

1. **Verifica la versión**: Asegúrate de tener la última versión del plugin
2. **Revisa la documentación**: Muchas preguntas están respondidas en este README
3. **Busca issues existentes**: Tu problema puede ya estar reportado

### Reportar un problema

Si encuentras un bug o tienes una sugerencia:

1. Ve a la sección [Issues](https://github.com/tuusuario/obsidian-ia-block/issues)
2. Busca si tu problema ya está reportado
3. Si no, crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Versión de Obsidian y del plugin
   - Capturas de pantalla si es relevante

### Solicitar una funcionalidad

Para solicitar nuevas funcionalidades:

1. Crea un issue con la etiqueta `enhancement`
2. Describe la funcionalidad deseada
3. Explica por qué sería útil
4. Proporciona ejemplos de uso si es posible

## 🔄 Historial de versiones

### v1.1.0 (Próximamente)
- Mejoras en el rendimiento
- Nuevos modelos de IA
- Mejor soporte para temas personalizados

### v1.0.0
- ✅ Lanzamiento inicial
- ✅ Soporte para múltiples modelos de IA
- ✅ Bloques de código estilizados
- ✅ Iconos locales sin dependencias externas
- ✅ Temas adaptativos (claro/oscuro)
- ✅ Funcionalidad de expandir/contraer
- ✅ Función de copiar contenido
- ✅ Accesibilidad mejorada
- ✅ Diseño responsive

---

<div align="center">

**¿Te gusta este plugin? ¡Considera darle una ⭐ en GitHub!**

[![GitHub stars](https://img.shields.io/github/stars/tuusuario/obsidian-ia-block?style=social)](https://github.com/tuusuario/obsidian-ia-block)
[![GitHub forks](https://img.shields.io/github/forks/tuusuario/obsidian-ia-block?style=social)](https://github.com/tuusuario/obsidian-ia-block)

</div>
