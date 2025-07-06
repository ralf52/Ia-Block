# Guía de Contribución

¡Gracias por tu interés en contribuir a IA Block Generator! Esta guía te ayudará a participar en el desarrollo del proyecto.

## 🤝 Cómo contribuir

### Tipos de contribuciones

Aceptamos diferentes tipos de contribuciones:

- **🐛 Reportar bugs** - Ayudar a identificar problemas
- **✨ Solicitar funcionalidades** - Proponer nuevas características
- **📝 Mejorar documentación** - Clarificar o expandir la documentación
- **💻 Contribuir código** - Implementar funcionalidades o correcciones
- **🎨 Mejorar diseño** - Sugerir mejoras visuales o de UX
- **🧪 Escribir tests** - Agregar cobertura de testing

## 🚀 Antes de comenzar

### Configurar el entorno

1. Sigue la [Guía de primeros pasos](GETTING_STARTED.md)
2. Asegúrate de que puedes ejecutar el proyecto localmente
3. Familiarízate con la [Guía de desarrollo](DEVELOPMENT.md)

### Comunicación

- **Issues**: Para reportar bugs o solicitar funcionalidades
- **Discussions**: Para preguntas generales y discusiones
- **Pull Requests**: Para contribuciones de código

## 📋 Proceso de contribución

### 1. Reportar un bug

Antes de crear un issue:

1. **Busca issues existentes** - Tu bug puede ya estar reportado
2. **Verifica la versión** - Asegúrate de usar la última versión
3. **Reproduce el bug** - Confirma que puedes reproducirlo consistentemente

Al crear el issue, incluye:

- **Título descriptivo** - Explica claramente el problema
- **Descripción detallada** - Qué esperabas vs qué pasó
- **Pasos para reproducir** - Lista numerada de pasos
- **Información del sistema** - Versión de Obsidian, OS, etc.
- **Capturas de pantalla** - Si es relevante
- **Logs de consola** - Si hay errores

### 2. Solicitar una funcionalidad

Al solicitar una nueva funcionalidad:

- **Describe el problema** - ¿Qué problema resuelve?
- **Propon la solución** - ¿Cómo debería funcionar?
- **Considera alternativas** - ¿Hay otras formas de resolverlo?
- **Proporciona ejemplos** - Casos de uso específicos

### 3. Contribuir código

#### Preparación

1. **Fork el repositorio** - Crea tu propio fork
2. **Crea una rama** - Usa una rama descriptiva para tu cambio
3. **Haz tus cambios** - Implementa la funcionalidad o corrección
4. **Sigue las convenciones** - Código, commits, y documentación

#### Convenciones de código

##### Commits

Usa mensajes de commit descriptivos:

```bash
# ✅ Bueno
feat: agregar soporte para nuevo modelo de IA
fix: corregir error de parsing en sintaxis
docs: actualizar guía de instalación

# ❌ Evitar
fix bug
update
```

##### Código

- **TypeScript**: Usa tipos estrictos y evita `any`
- **React**: Componentes funcionales con hooks
- **CSS**: Variables CSS y BEM para nombres
- **Comentarios**: Documenta código complejo

##### Tests

- Agrega tests para nuevas funcionalidades
- Asegúrate de que todos los tests pasen
- Mantén la cobertura de código

#### Crear un Pull Request

1. **Título descriptivo** - Explica el cambio claramente
2. **Descripción detallada** - Qué cambió y por qué
3. **Referencia issues** - Usa `Closes #123` o `Fixes #123`
4. **Capturas de pantalla** - Si hay cambios visuales
5. **Checklist** - Marca las tareas completadas

### 4. Revisión de código

#### Antes de enviar

- [ ] El código sigue las convenciones del proyecto
- [ ] Los tests pasan
- [ ] La documentación está actualizada
- [ ] El código funciona en Obsidian
- [ ] No hay errores de linting

#### Durante la revisión

- Responde a los comentarios de revisión
- Haz los cambios solicitados
- Mantén la conversación constructiva

## 🎯 Áreas de contribución

### Prioridades actuales

- **Mejoras de rendimiento** - Optimizar el renderizado
- **Nuevos modelos de IA** - Agregar soporte para más modelos
- **Mejoras de accesibilidad** - Hacer el plugin más accesible
- **Tests** - Agregar cobertura de testing
- **Documentación** - Mejorar y expandir la documentación

### Ideas para contribuir

- **Nuevos temas** - Crear variaciones de colores
- **Funcionalidades adicionales** - Exportar, compartir, etc.
- **Optimizaciones** - Mejorar el tamaño del bundle
- **Internacionalización** - Soporte para múltiples idiomas

## 📚 Recursos

### Documentación

- [Primeros pasos](GETTING_STARTED.md) - Configurar el entorno
- [Guía de desarrollo](DEVELOPMENT.md) - Arquitectura y código
- [Changelog](CHANGELOG.md) - Historial de cambios

### Enlaces útiles

- [Issues](https://github.com/ralf52/Ia-Block/issues) - Reportar problemas
- [Discussions](https://github.com/ralf52/Ia-Block/discussions) - Preguntas y discusiones
- [Releases](https://github.com/ralf52/Ia-Block/releases) - Versiones publicadas

## 🏆 Reconocimiento

Todas las contribuciones son valiosas y serán reconocidas:

- **Contribuidores** - Listados en el README
- **Menciones** - En notas de release
- **Agradecimientos** - En documentación

## 📞 Obtener ayuda

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación existente
2. Busca en issues y discussions
3. Crea una nueva discussion
4. Contacta a los mantenedores

¡Gracias por contribuir a hacer IA Block Generator mejor! 🚀 