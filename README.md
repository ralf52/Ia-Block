<p align="right">
  <a href="README.es.md">Español</a> | <b>English</b>
</p>

# IA Block Generator

An Obsidian plugin that creates stylized and visually attractive blocks for AI-generated content, with support for multiple models and a modern interface.

## Usage
![Trailer](https://github.com/user-attachments/assets/90ba11fa-594e-4191-b68b-644885c8f703)

## Themes
#### Default
![default](https://github.com/user-attachments/assets/8cf9d104-0129-4f7b-a205-ad0354cbb2ee)
#### ChatGPT
![cg](https://github.com/user-attachments/assets/ef8494a2-8052-4200-b633-eb70d3c92aa0)
#### Gemini
![g](https://github.com/user-attachments/assets/fdf4132f-db78-4b6c-a682-f822251ac529)
#### Copilot
![c](https://github.com/user-attachments/assets/7cfb1f48-f639-4171-b990-ca1e80ebeeb9)
#### DeepSeek
![dp](https://github.com/user-attachments/assets/fc555e7b-61ad-4573-8f2a-03600d5a86ea)

## Installation

### From Obsidian (Recommended)
1. Open **Settings** in Obsidian
2. Go to **Community Plugins**
3. Disable **Safe Mode** if enabled
4. Click **Browse**
5. Search for "IA Block Generator"
6. Click **Install** and then **Enable**

### Manual Installation
1. Download `main.js`, `styles.css`, and `manifest.json` from the [latest release](https://github.com/ralf52/Ia-Block/releases)
2. Extract the contents into your Obsidian plugins folder:
   ```
   {vault}/.obsidian/plugins/ia-block-generator/
   ```
3. Restart Obsidian
4. Enable the plugin in **Settings** > **Community Plugins** > **Ia-Block**

## Basic Syntax

Create IA blocks using Obsidian's code syntax:
![Syntax](https://github.com/user-attachments/assets/2623d568-e1d1-4fe6-81fa-56695a805b1e)

````markdown
```ia-block
ia:cg title:Syntax
### Example
```
````

## Supported AI Models

| Code | Model | Description |
|------|-------|-------------|
| `default` | AI Assistant | Generic model with AI icon |
| `dp` | DeepSeek-R1 | DeepSeek model with official logo |
| `cg` | ChatGPT | OpenAI model with official logo |
| `c` | Copilot | Microsoft model with official logo |
| `g` | Gemini | Google model with official logo |

## Usage Examples

### Analysis with DeepSeek
````markdown
```ia-block
ia:dp title:Data Analysis
The data shows a 23% increase in sales.
**Recommendation**: Continue with the current strategy.
```
````

### Summary with ChatGPT
````markdown
```ia-block
ia:cg title:Executive Summary
This document presents a comprehensive analysis of the current market situation
and the growth opportunities identified.
```
````

## Customization

### Plugin Settings

Go to **Settings** > **Community Plugins** > **IA Block Generator** to adjust:

- **Open tabs by default**: Controls whether blocks appear expanded initially

### System Requirements

- **Obsidian**: Version 1.8.10 or higher

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contributing

Would you like to contribute to the project? Check out our [contribution guide](docs/CONTRIBUTING.md) for more details.

## Documentation

- [Getting Started](docs/GETTING_STARTED.md) - Quick start guide
- [Development Guide](docs/DEVELOPMENT.md) - How to set up the development environment
- [Contribution Guide](docs/CONTRIBUTING.md) - How to contribute to the project
- [Changelog](docs/CHANGELOG.md) - Change history

## Version History

### v1.0.1 (Coming Soon)
- Performance improvements
- New AI models

### v1.0.0
- Initial release
- Support for multiple AI models
- Stylized code blocks
- Local icons with no external dependencies
- Adaptive themes (light/dark)
- Expand/collapse functionality
- Copy content feature
- Improved accessibility
- Responsive design
