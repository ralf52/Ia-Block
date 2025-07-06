# IA Block Generator

Un plugin para Obsidian que crea bloques estilizados y visualmente atractivos para contenido generado por IA, con soporte para múltiples modelos y una interfaz moderna.

## 📖 Uso
![Trailer](https://github.com/user-attachments/assets/90ba11fa-594e-4191-b68b-644885c8f703)

## Temas
#### Default
![default](https://github.com/user-attachments/assets/8cf9d104-0129-4f7b-a205-ad0354cbb2ee)
#### ChatGPT
![cg](https://github.com/user-attachments/assets/ef8494a2-8052-4200-b633-eb70d3c92aa0)
#### Gemmini
![g](https://github.com/user-attachments/assets/fdf4132f-db78-4b6c-a682-f822251ac529)
#### Copilot
![c](https://github.com/user-attachments/assets/7cfb1f48-f639-4171-b990-ca1e80ebeeb9)
#### DeepSeek
![dp](https://github.com/user-attachments/assets/fc555e7b-61ad-4573-8f2a-03600d5a86ea)

## 🚀 Instalación

### Desde Obsidian (Recomendado)
1. Abre **Configuración** en Obsidian
2. Ve a **Complementos de la comunidad**
3. Desactiva **Modo seguro** si está activado
4. Haz clic en **Explorar**
5. Busca "IA Block Generator"
6. Haz clic en **Instalar** y luego **Activar**

### Instalación manual
1. Descarga el archivo `main.js`, `styles.css` y `manifest.json` de la [última versión](https://github.com/ralf52/Ia-Block/releases)
2. Extrae el contenido en tu carpeta de plugins de Obsidian:
   ```
   {vault}/.obsidian/plugins/ia-block-generator/
   ```
3. Reinicia Obsidian
4. Activa el plugin en **Configuración** → **Complementos de la comunidad**



### Sintaxis básica

Crea bloques IA usando la sintaxis de código de Obsidian:
![Sintaxis](https://github.com/user-attachments/assets/2623d568-e1d1-4fe6-81fa-56695a805b1e)

````markdown
```ia-block
ia:cg title:Sintaxis
### Example
```
````

### Modelos de IA soportados

| Código | Modelo | Descripción |
|--------|--------|-------------|
| `default` | Asistente IA | Modelo genérico con icono de IA |
| `dp` | DeepSeek-R1 | Modelo de DeepSeek con logo oficial |
| `cg` | ChatGPT | Modelo de OpenAI con logo oficial |
| `c` | Copilot | Modelo de Microsoft con logo oficial |
| `g` | Gemini | Modelo de Google con logo oficial |

### Ejemplos de uso

#### Análisis con DeepSeek
````markdown
   ```ia-block
   ia:dp title:Análisis de datos
   Los datos muestran un incremento del 23% en ventas.
   **Recomendación**: Continuar con la estrategia actual.
   ```
````

#### Resumen con ChatGPT
````markdown
   ```ia-block
   ia:cg title:Resumen ejecutivo
   Este documento presenta un análisis completo de la situación actual
   del mercado y las oportunidades de crecimiento identificadas.
   ```
````

## 🎨 Personalización

### Configuración del plugin

Ve a **Configuración** → **Complementos de la comunidad** → **IA Block Generator** para ajustar:

- **Pestañas abiertas por defecto**: Controla si los bloques aparecen expandidos inicialmente


### Requisitos del sistema

- **Obsidian**: Versión 1.8.10 o superior

## 📝 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para detalles completos.

## 🤝 Contribuir

¿Te gustaría contribuir al proyecto? Consulta nuestra [guía de contribución](docs/CONTRIBUTING.md) para más detalles.

## 📚 Documentación

- [Primeros pasos](docs/GETTING_STARTED.md) - Guía de inicio rápido
- [Guía de desarrollo](docs/DEVELOPMENT.md) - Cómo configurar el entorno de desarrollo
- [Guía de contribución](docs/CONTRIBUTING.md) - Cómo contribuir al proyecto
- [Changelog](docs/CHANGELOG.md) - Historial de cambios

## 🔄 Historial de versiones

### v1.0.1 (Próximamente)
- Mejoras en el rendimiento
- Nuevos modelos de IA

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
