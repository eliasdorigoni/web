---
title: "Textos en una fuente, numeros en otra."
date: "2018-08-28T17:56:52-03:00"
description: Mientras quede bonito...
categorias: ["CSS", "Fuentes"]
---

**No me gustan los números de Raleway.** Si a la diseñadora no le gustan y al cliente tampoco, tenemos vía libre para buscar una alternativa. En este post vamos a mostrar los textos en Raleway y los números en Open Sans, usando sólo CSS.

Si sabemos los caracteres que va a usar un texto, Google Fonts nos permite usar el parámetro `text` para limitar los caracteres disponibles en una fuente. Esto reduce la cantidad de bytes.

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans&text=0123456789" rel="stylesheet">
```

Con eso ya tenemos los números. **En otro tag aparte** se carga la o las fuentes que vaya a usar la app.

```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans&text=0123456789" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
```

Dentro del CSS, el stack de `font-family` tiene que tener primero la fuente para números, seguido del resto.

```css
p {
    font-family: 'Open Sans', 'Raleway', 'Comic Sans', sans-serif;
}
```

De esta manera el navegador va a usar siempre la primer fuente para números y el resto para los otros caracteres.

## "¿Y si no uso Google Fonts?"

Si estas usando una fuente con más que numeros, se pueden limitar los caracteres usando la propiedad `unicode-range` dentro de `@font-face`:

```css
@font-face {
    font-family: 'mi_fuente';
    src: url('mi_fuente.woff2') format('woff2'),
         url('mi_fuente.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    unicode-range: U+30-39;
}

p {
    font-family: 'mi_fuente', 'Comic Sans', sans-serif;
}
```
