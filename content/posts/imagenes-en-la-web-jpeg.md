---
title: "Imagenes en la web: el formato JPEG"
date: 2018-11-12T16:00:00-03:00
draft: true
categorias: ["Imagenes web"]
---

Con este artículo inicio una serie donde quiero investigar de manera profunda los formatos más usados para imagenes en la web: JPEG, PNG y GIF.

Saber qué hace cada tecnología nos permite elegir la más adecuada para cada ocasión.

# Todo comienza con un píxel

**El píxel es un valor**, un número que va desde 0 a 255. En una escala de grises **0** es negro, **255** es blanco y todos los valores en el medio son diferentes tonalidades de gris.

Por qué 256 valores? Porque la unidad más pequeña de información, el byte, está compuesta por 8 bits, es decir un número binario de 8 posiciones (por ejemplo 10011000), lo que nos da 2^8 (256) combinaciones posibles.

Pero esto sólo representa 256 tonalidades de un solo color. Para mostrar más de un color el píxel debe tener como mínimo **3 canales** (como el ojo humano), es decir 3 valores, y aplicar un **modelo de color** que especifique qué representa cada canal.

El modelo de color más usado es el **RGB**, que tiene tres canales: rojo \(R\), verde (G) y azul (B). Cada canal indica cuánto de ese color se debe aplicar para lograr el color final del píxel. Es un modelo de color *aditivo*, por lo que valores bajos hacen colores oscuros y valores altos hacen colores claros.

Existen otros modelos como el CMYK (cyan, magenta, amarillo, negro) de 4 canales usado en imprenta, el HSL (matiz, saturación, luminosidad) usado en pantallas o el RGBA (rojo, verde, azul, alpha) donde el cuarto canal representa transparencias.


# Basado en el ojo humano
En los años 50 se investigaron y desarrollaron diferentes maneras de comprimir la señal enviada a los televisores.

A través de diferentes estudios se observó que el ojo humano percibe mejor los cambios de luminancia (brillo) que los cambios de crominancia (color).

Por lo tanto se puede reducir la información de color y mantener, hasta cierto punto, la calidad percibida de la imagen.

# El formato JPEG
El formato JPEG es en realidad un algoritmo de compresión **con pérdidas**, lo que significa que siempre se pierde algo de información y no se puede restaurar. Si se comprime una imagen que ya comprimida, se vuelve a perder calidad.

Asimismo, esta pérdida le permite comprimir los datos por lo general al 10% de su tamaño original.

El algoritmo realiza 4 operaciones claras

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
La información de cada canal se divide en bloques de 8x8 píxeles y se aplica la Transformación Discreta de Coseno o DCT, que representa los valores del bloque como frecuencias en un gráfico sinusoidal. [En este video de Computerphile](https://www.youtube.com/watch?v=Q2aEzeMDHMA) se explica mejor de lo que yo podría hacerlo.

Cada bloque de 8x8 pierde un poco de resolución.


## 4. Cuantificación
La cuantificación descarta información de alta frecuencia, como las transiciones repentinas en intensidad y color. Es en esta operación donde se pierde la mayor información, y lo que le da el característico efecto cuadriculado a las imágenes con altos niveles de compresión.


## 5. Compresión
Aquí se aplican métodos de compresión **sin pérdidas** para comprimir la información sin perder calidad.

Hay 2 tipos de compresión:

• De línea base, que arma la imagen en una pasada
• progresiva, que arma la imagen en varias pasadas.

Esto se percibe cuando vemos imágenes con conexiones lentas:

(Imágenes)




# Ejemplos en Photoshop