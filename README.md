IA Blocks Plugin for Obsidian

Este plugin de Obsidian te permite resaltar respuestas de IA con estilos visuales únicos para cada proveedor, mejorando la legibilidad y organización de tus notas con contenido generado por inteligencia artificial.

Características principales
🎨 Estilos visuales personalizados para cada proveedor de IA

💬 Sintaxis simple con parámetros configurables

🚀 Renderizado eficiente usando React

⚙️ Altamente personalizable mediante CSS

Instalación
Ve a Configuración > Plugins > Comunidad

Busca "IA Blocks"

Haz clic en Instalar

Activa el plugin

Instalación manual:

Descarga la última versión de Releases

Extrae en tu carpeta de plugins de Obsidian: .obsidian/plugins/ia-blocks

Uso
Sintaxis básica
markdown
```ia-block ìa:dp
Este contenido será estilizado como respuesta de DeepSeek
```
Parámetros avanzados
Parámetro	Valores	Descripción
ìa	dp, cg, c	Proveedor de IA (DeepSeek, ChatGPT, Copilot)
title	Texto libre	Título personalizado para el bloque
theme	light, dark	Tema visual (opcional)
Ejemplos
Bloque con título personalizado:

markdown
```ia-block ìa:cg title:Análisis de mercado
El análisis sugiere una tendencia alcista...
```
Bloque con tema oscuro:

markdown
```ia-block ìa:c theme:dark
Sugiero implementar estas mejoras...
```
Combinación de parámetros:

markdown
```ia-block ìa:dp title:Resumen ejecutivo theme:light
El proyecto muestra un ROI prometedor...
```
Estilos visuales predeterminados
Proveedor	Color principal	Icono
DeepSeek	#2E7DDB	🤖
ChatGPT	#10A37F	💬
Copilot	#7F66FF	🧠
Personalización
Puedes sobrescribir los estilos añadiendo este CSS en tu snippet personalizado:

css
/* En tu obsidian.css o snippet CSS */

.ia-block.dp {
  --ia-primary: #2E7DDB;
  --ia-icon: "🤖";
}

.ia-block.cg {
  --ia-primary: #10A37F;
  --ia-icon: "💬";
}

.ia-block.c {
  --ia-primary: #7F66FF;
  --ia-icon: "🧠";
}

.ia-block {
  border-left: 4px solid var(--ia-primary);
  padding: 1em;
  background-color: color-mix(in srgb, var(--ia-primary) 10%, transparent);
  border-radius: 0 8px 8px 0;
}

.ia-block-header::before {
  content: var(--ia-icon);
  margin-right: 8px;
}
Desarrollo
Este plugin está construido con:

TypeScript

React (JSX)

Obsidian API

CSS Modules

Requisitos para desarrollo
Node.js v16+

npm

Comandos útiles
bash
# Instalar dependencias
npm install

# Modo desarrollo (observa cambios)
npm run dev

# Build de producción
npm run build
Contribuciones
Las contribuciones son bienvenidas! Por favor:

Haz un fork del repositorio

Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad)

Haz commit de tus cambios (git commit -am 'Añade nueva funcionalidad')

Haz push a la rama (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

Créditos
Este proyecto está basado en el Obsidian Sample Plugin.
[Obsidian-example-plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

Desarrollado con ❤️ por [Ralf52](https://github.com/ralf52)

Licencia
MIT License - Ver LICENSE para más detalles

¿Necesitas ayuda o tienes sugerencias? Abre un issue en GitHub!
