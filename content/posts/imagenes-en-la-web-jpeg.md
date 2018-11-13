---
title: "Imagenes en la web: el formato JPEG"
date: 2018-11-12T16:00:00-03:00
draft: true
categorias: ["Imagenes web"]
---

Con este artículo inicio una serie donde quiero investigar de manera profunda los formatos más usados para imagenes en la web: JPEG, PNG y GIF.

Saber qué hace cada tecnología nos permite elegir la más adecuada para cada ocasión.

# Anatomía del píxel
Sin píxel no hay imagen. Veamos qué lo define...

**El píxel es un valor**, un número que va desde 0 a 255, donde **0** es negro, **255** es blanco y todo lo del medio son diferentes tonalidades de gris, lo que nos da un total de 256 variaciones, o dicho de otra manera **8 bits** de información en sistema binario (2<sup>8</sup> = 256).

Pero esto sólo representa una escala de grises. Para mostrar colores el píxel debe tener como mínimo **3 canales**, es decir 3 valores, y aplicar un **modelo de color** que especifique qué representa cada valor.

El modelo de color más usado es el **RGB**, que tiene tres canales: rojo \(R\), verde (G) y azul (B). Cada canal indica cuánto de ese color se debe aplicar para lograr el color final del píxel. Es un modelo de color *aditivo*, por lo que valores bajos hacen colores oscuros y valores altos hacen colores claros.


# Descripción
El formato JPEG es un algoritmo de compresión **con pérdidas**, es decir que la imagen final tiene menor calidad comparada con la original. Si se comprime una imagen ya comprimida, se vuelve a perder calidad.


# Antecedentes
El ojo humano percibe mejor los cambios de luminancia (brillo) que los cambios de crominancia (color). El algoritmo de compresión aprovecha este principio para descartar información de color que el ojo humano no notaría a simple vista.


# Etapas de codificación

## 1. Transformación del espacio de color
En primer lugar es necesario convertir la información al modelo de color **YCbCr**:

* el componente **Y** representa la luminancia del píxel;
* el componente **Cb** representa la diferencia azul del pixel (un rango donde 0% es amarillo y 100% es azul);
* el componente **Cr** representa la diferencia roja del pixel(0% es verde, 100% es rojo).

A diferencia del RGB, este modelo de color tiene la **luminancia separada en su propio canal**, lo que permite tratar luz y color por separado, aprovechando la diferencia de sensibilidad del ojo humano.

Durante la conversión entre RGB y YCbCr hay una pequeña pérdida de información, debido al redondeo que se usa en el cálculo. Aunque es imperceptible para el ojo humano, igual existe.

## 2. Submuestreo de crominancia
El submuestreo de crominancia básicamente *desenfoca* los colores, reduciendo su resolución y por lo tanto la cantidad de datos necesarios para mostrarlos.

<table class="sin-bordes centrar">
    <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td rowspan="3"> &nbsp; &rarr; &nbsp; </td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
    </tr>
    <tr>
        <td>1</td>
        <td style="background:#6666ff;text-align:center">1</td>
        <td style="background:#66ffff;text-align:center">2</td>
        <td style="background:#66ff66;text-align:center">3</td>
        <td style="background:#999999;text-align:center">4</td>
        <td style="background:#6666ff;text-align:center" colspan="2">1</td>
        <td style="background:#66ff66;text-align:center" colspan="2">2</td>
    </tr>
    <tr>
        <td>2</td>
        <td style="background:#ff66ff;text-align:center">1</td>
        <td style="background:#ffffff;text-align:center">2</td>
        <td style="background:#ffff66;text-align:center">3</td>
        <td style="background:#ff6666;text-align:center">4</td>
        <td style="background:#ff66ff;text-align:center" colspan="2">1</td>
        <td style="background:#ffff66;text-align:center" colspan="2">2</td>
    </tr>
</table>

En este caso particular se **combinan horizontalmente** 2 columnas, reduciendo los colores a sólo 4. Este *desenfoque* puede ser más o menos agresivo, abarcando sólo filas horizontales, sólo verticales o ambos ejes, y afectar 1, 2 o 4 columnas. 


## 3. Separación en bloques
La información de cada canal se divide en bloques de 8x8 píxeles y se aplica la Transformación Discreta de Coseno o DCT, que transforma los valores del bloque para representarlos en un gráfico sinusoidal. [En este video de Computerphile](https://www.youtube.com/watch?v=Q2aEzeMDHMA) se explica mejor de lo que yo podría hacerlo.

En definitiva, cada bloque de 8x8 pierde resolución pero mantiene la idea de cómo se ve. **A mayor compresión, más visibles se hacen estos bloques**.


## 4. Cuantificación
A los valores devueltos por la DCT se los divide por los valores definidos en una **matriz de cuantificación** y se los redondea. Es en este redondeo donde se pierde la mayor información. Las matrices de cuantificación pueden ser diferentes, dependiendo del nivel de compresión usado.


## 5. Compresión
Aquí se aplican métodos de compresión **sin pérdidas** para reducir el tamaño del archivo sin perder calidad en la imagen.


# Ejemplos en Photoshop


https://www.photoshopessentials.com/essentials/jpeg-compression/
