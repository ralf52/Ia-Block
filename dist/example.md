# Ejemplos de uso del IA Block Generator Plugin

## Bloques de código básicos

### Modelo por defecto
```ia-block
ia: default
title: Respuesta del Asistente IA
Este es un ejemplo de contenido generado por un asistente de IA genérico.
Puede incluir **texto en negrita**, *texto en cursiva* y `código inline`.
```

### DeepSeek-R1
```ia-block
ia: dp
title: Análisis de DeepSeek-R1
DeepSeek-R1 es un modelo de lenguaje avanzado que puede realizar análisis complejos.
- Punto 1: Capacidades de razonamiento
- Punto 2: Comprensión contextual
- Punto 3: Generación de código
```

### ChatGPT
```ia-block
ia: cg
title: Respuesta de ChatGPT
ChatGPT es un modelo de lenguaje desarrollado por OpenAI que puede:
1. Responder preguntas
2. Generar texto creativo
3. Ayudar con programación
4. Proporcionar explicaciones detalladas
```

### Copilot
```ia-block
ia: c
title: Sugerencia de Copilot
```python
def fibonacci(n):
    """Calcula el n-ésimo número de Fibonacci."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
Esta función calcula números de Fibonacci de forma recursiva.
```

### Gemini
```ia-block
ia: g
title: Análisis de Gemini
Gemini es el modelo de IA más avanzado de Google, capaz de:
- Procesar texto, imágenes y audio
- Realizar tareas multimodales
- Proporcionar respuestas contextuales
- Aprender de manera continua
```

## Bloques inline

### Respuesta rápida de DeepSeek
++++
ia: dp
title: Respuesta rápida
Esta es una respuesta rápida usando la sintaxis inline con ++++.
++++

### Comentario de ChatGPT
++++
ia: cg
title: Comentario
Un comentario breve usando la sintaxis inline.
++++

## Contenido con matemáticas

```ia-block
ia: default
title: Ecuaciones matemáticas
El teorema de Pitágoras establece que:

$$a^2 + b^2 = c^2$$

Donde $a$ y $b$ son los catetos y $c$ es la hipotenusa.

También podemos usar ecuaciones inline como $E = mc^2$.
```

## Contenido con código

```ia-block
ia: c
title: Ejemplo de código JavaScript
```javascript
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

console.log(saludar("Mundo"));
```
Este código define una función que saluda al usuario.
```

## Listas y tablas

```ia-block
ia: cg
title: Comparación de modelos
| Modelo | Empresa | Características |
|--------|---------|-----------------|
| ChatGPT | OpenAI | Conversacional, creativo |
| DeepSeek | DeepSeek | Razonamiento, código |
| Copilot | Microsoft | Programación, asistencia |
| Gemini | Google | Multimodal, avanzado |

### Ventajas principales:
- **ChatGPT**: Excelente para conversaciones
- **DeepSeek**: Especializado en razonamiento
- **Copilot**: Ideal para programadores
- **Gemini**: Versátil y multimodal
```

## Notas importantes

- Cada modelo tiene su propio esquema de colores
- Los bloques son completamente interactivos
- Puedes copiar el contenido con el botón de copiar
- Los bloques se pueden expandir/contraer
- Soporte completo para Markdown, matemáticas y código 