---
title: "Imagenes en la web: el formato JPEG"
date: "2018-11-12T16:00:00-03:00"
draft: true
categorias: ["Imagenes web"]
---

Con este artículo quiero iniciar una serie donde investigo de manera profunda los formatos más usados para imagenes en la web: JPEG, PNG y GIF.

Saber qué hace cada tecnología nos permite elegir la más adecuada para cada ocasión.

# tl;dr

Conviene usar JPEG para fotografías o imágenes *del mundo real*, donde no hayan cambios fuertes de color. Si usas Photoshop, usar calidad mayor a 10 es desperdiciar espacio.


# Comienza con el píxel

**El píxel es un valor**, un número que va desde 0 a 255. En una escala de grises **0** es negro, **255** es blanco y todos los valores en el medio son diferentes tonalidades de gris.

<svg width="500px" height="66px" viewBox="0 0 500 66" xmlns="http://www.w3.org/2000/svg" style="background-color:#fdff73;display:block;margin:0 auto">
    <rect width="30" height="30" fill="#000" x="10" y="24" />
    <text x="26" y="16" font-size="12" text-anchor="middle">0</text>
    <rect width="30" height="30" fill="#111" x="40" y="24" />
    <text x="56" y="16" font-size="12" text-anchor="middle">17</text>
    <rect width="30" height="30" fill="#222" x="70" y="24" />
    <text x="86" y="16" font-size="12" text-anchor="middle">34</text>
    <rect width="30" height="30" fill="#333" x="100" y="24" />
    <text x="116" y="16" font-size="12" text-anchor="middle">51</text>
    <rect width="30" height="30" fill="#444" x="130" y="24" />
    <text x="146" y="16" font-size="12" text-anchor="middle">68</text>
    <rect width="30" height="30" fill="#555" x="160" y="24" />
    <text x="176" y="16" font-size="12" text-anchor="middle">85</text>
    <rect width="30" height="30" fill="#666" x="190" y="24" />
    <text x="206" y="16" font-size="12" text-anchor="middle">102</text>
    <rect width="30" height="30" fill="#777" x="220" y="24" />
    <text x="236" y="16" font-size="12" text-anchor="middle">119</text>
    <rect width="30" height="30" fill="#888" x="250" y="24" />
    <text x="266" y="16" font-size="12" text-anchor="middle">136</text>
    <rect width="30" height="30" fill="#999" x="280" y="24" />
    <text x="296" y="16" font-size="12" text-anchor="middle">153</text>
    <rect width="30" height="30" fill="#aaa" x="310" y="24" />
    <text x="326" y="16" font-size="12" text-anchor="middle">170</text>
    <rect width="30" height="30" fill="#bbb" x="340" y="24" />
    <text x="356" y="16" font-size="12" text-anchor="middle">187</text>
    <rect width="30" height="30" fill="#ccc" x="370" y="24" />
    <text x="386" y="16" font-size="12" text-anchor="middle">204</text>
    <rect width="30" height="30" fill="#ddd" x="400" y="24" />
    <text x="416" y="16" font-size="12" text-anchor="middle">221</text>
    <rect width="30" height="30" fill="#eee" x="430" y="24" />
    <text x="446" y="16" font-size="12" text-anchor="middle">238</text>
    <rect width="30" height="30" fill="#fff" x="460" y="24" />
    <text x="476" y="16" font-size="12" text-anchor="middle">255</text>
</svg>

> **¿Por qué 256 valores diferentes y no 10 o 100?**

> Porque el valor del píxel se guarda en un byte, la unidad más pequeña de información, que está formada por 8 bits. El bit es un número binario, 0 o 1. Por lo tanto, con 2 valores en 8 posiciones tenemos 2<sup>8</sup> combinaciones posibles, 256.

Pero esto sólo representa 256 tonalidades de un solo color. Para mostrar más de un color el píxel debe tener como mínimo **3 canales** o 3 valores diferentes, y aplicar un **modelo de color** que especifique qué representa cada canal.

El modelo de color más usado es el **RGB**, que tiene tres canales: rojo \(R\), verde (G) y azul (B). Cada canal indica cuánto de ese color se debe aplicar para lograr el color final del píxel. Es un modelo de color *aditivo*, por lo que valores bajos hacen colores oscuros y valores altos hacen colores claros.

Existen otros modelos como el CMYK (cyan, magenta, amarillo, negro) de 4 canales usado en imprenta, el HSL (matiz, saturación, luminosidad) usado en pantallas o el RGBA (rojo, verde, azul, alpha) donde el cuarto canal representa transparencias.


# ¿Cómo funciona JPEG?
El formato JPEG es un algoritmo de compresión que reduce la resolución del color de una imagen, tratando de mantener la resolución del brillo.

En los años 50 durante el desarrollo de la televisión y transmisión de datos, diferentes estudios demostraron que **el ojo humano percibe mejor los cambios de luminancia (brillo) que los cambios de crominancia (color)**. Dicho de otra manera, le cuesta más detectar cambios de color que cambios de brillo. Esto permitió crear diferentes técnicas como el submuestreo de crominancia o *chroma subsampling* que reducen la cantidad de información de color sin disminuir la calidad percibida de la imagen. Esta propiedad del ojo humano es la que aprovecha el formato JPEG.

La compresión que utiliza tiene pérdidas (es **_lossy_**), es decir cada vez que se ejecuta descarta algo de información que no se puede recuperar, lo que puede afectar a la calidad general de la imagen. Y justamente por tener pérdidas el algoritmo puede comprimir la información a un 10% de su tamaño original, en general.

El algoritmo **transforma** el espacio de color, **submuestrea** los colores, **separa** en bloques de 8x8 píxeles y los presenta en un gráfico, **cuantifica** las frecuencias altas y **comprime** la información resultante.

## 1. Transformación del espacio de color
El primer paso convierte la información al modelo de color **YCbCr**:

* el canal **Y** representa la *luminancia* o brillo del píxel;
* el canal **Cb** representa la *diferencia azul* del pixel (un rango donde 0% es amarillo y 100% es azul);
* el canal **Cr** representa la *diferencia roja* del pixel (otro rango, 0% es verde, 100% es rojo).

A diferencia del RGB, este modelo de color tiene **un canal dedicado a la luminancia**, lo que permite tratar luz y color por separado, aprovechando la diferencia de sensibilidad del ojo humano.

## 2. Submuestreo de crominancia
Básicamente es un *desenfoque* de los canales Cb y Cr, reduciendo su resolución y por lo tanto la cantidad de datos necesarios para mostrarlos.

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

En este ejemplo, suponiendo que el bloque de la izquierda son 8 colores de los canales Cb y Cr, el submuestreo **combina los colores** con las celdas vecinas, reduciendo la resolución a la mitad. La combinación puede abarcar más celdas si la compresión es más alta.


## 3. Separación en bloques
La información de cada canal se divide en bloques de 8x8 píxeles y se aplica la Transformación Discreta de Coseno o DCT, que representa los valores del bloque como frecuencias en un gráfico sinusoidal. [En este video de Computerphile](https://www.youtube.com/watch?v=Q2aEzeMDHMA) se explica mejor de lo que yo podría hacerlo.


## 4. Cuantificación digital
La cuantificación descarta información de alta frecuencia, como las transiciones o cambios repentinos en intensidad y color. Acá es donde se pierde la mayor información, y lo que le da el característico *efecto cuadriculado* a las imágenes con altos niveles de compresión.


## 5. Compresión
Se aplican métodos de compresión **sin pérdidas** para comprimir la información sin perder calidad.

Hay 2 tipos de compresión:

* **De línea base**, que permite descomprimir la imagen en una sola pasada;
* **Progresiva**, que descomprime la imagen en varias pasadas.

Esto se percibe cuando vemos imágenes con conexiones lentas:

(Imágenes)

# Ejemplos en Photoshop
