---
title: "Imagenes en la web: el píxel"
date: 2018-11-12T15:00:00-03:00
draft: true
categorias: ["imagen"]
series: ["Imagenes en la web"]
js: ["imagenes-en-la-web"]
---

Aunque los formatos de imagen en [la serie "Imagenes en la web"](/series/imagenes-en-la-web/) tienen propiedades diferentes, también tienen algo en común: el **píxel**. En este artículo vemos a ver qué pasa debajo de este punto de luz.

Prepará un café. Grande.

# Empecemos por el principio
En los primeros monitores las imágenes utilizaban  **1 _bit_ por píxel** (un número binario de un caracter, es decir 0 o 1).

Con 1 bit disponible en cada píxel de la imagen tenemos 2 valores que podemos usar para manipular el brillo del píxel.

0 se traduce a píxel con brillo al 0%, o sea negro o apagado.<br>
1 se traduce a píxel con brillo al 100%, o sea blanco (o del color que sea la pantalla) o encendido.

{{< figure src="/assets/img/posts/imagenes-en-la-web/1bpp.gif" alt="Fotografía de una hoja de árbol en 2 colores" title="Hoja de árbol al 200% de zoom, usando sólo blanco y negro" attr="Créditos de la imagen" attrlink="https://www.wesaturate.com/photo/izFUQ2BP" target="_blank" rel="noopener" >}}


Con el avance de la tecnología y mejores procesadores comenzamos a tener **2 bits por píxel**. Con 2 bits tenemos 4 combinaciones: 00, 01, 10 y 11.

{{< figure src="/assets/img/posts/imagenes-en-la-web/2bpp.gif" alt="Fotografía de una hoja de árbol a 4 colores" title="Hoja de árbol al 200% de zoom, usando 0, 33%, 66% y 100% de brillo" attr="Créditos de la imagen" attrlink="https://www.wesaturate.com/photo/izFUQ2BP" target="_blank" rel="noopener" >}}


**4 bits por píxel** permiten 16 combinaciones.

{{< figure src="/assets/img/posts/imagenes-en-la-web/4bpp.gif" alt="Fotografía de una hoja de árbol a 16 colores" title="Hoja de árbol al 200% de zoom con 16 niveles de brillo" attr="Créditos de la imagen" attrlink="https://www.wesaturate.com/photo/izFUQ2BP" target="_blank" rel="noopener" >}}


Y finalmente con **8 bits por píxel** las combinaciones suben a 256. En la gran mayoría de los casos (cámaras fotográficas comerciales, smartphones, etc) esto es lo que se usa.

> Las permutaciones posibles siempre son 2<sup>n</sup>, siendo _n_ la cantidad de bits (8 bits = 2<sup>8</sup> = 256).

{{< figure src="/assets/img/posts/imagenes-en-la-web/8bpp.jpg" alt="Fotografía de una hoja de árbol a 256 colores" title="Hoja de árbol de 256 colores al 200% de zoom" attr="Créditos de la imagen" attrlink="https://www.wesaturate.com/photo/izFUQ2BP" target="_blank" rel="noopener" >}}

También se puede decir que la **profundidad del color** de la última imagen es de 8 bits.


# Agregando color
En la retina del ojo humano hay 2 células sensibles a la luz: los famosos conos y bastones.

Los conos son los que nos interesan.

Hay 3 tipos de conos sensibles a diferentes longitudes de onda: unos son sensibles a la luz en el espectro rojo, otros al espectro verde y otros al azul. Gracias a esto podemos distinguir alrededor de 10 millones de colores.

> Dato de saquito de té:<br>Las palomas tienen 5 tipos de conos, lo que resulta en 10 mil millones de colores.

Por lo tanto, para mostrar una luz de cualquier color necesitamos **3 componentes**, uno por cada color primario de la luz.<br>
Y por lo tanto, el píxel debe tener 3 **canales** o valores.

# Modelos de color

El **modelo de color RGB** interpreta cada canal como diferentes intensidades de cada color primario de la luz:

+ el canal **R** (red) define la intensidad del color rojo,
+ el canal **G** (green) define la intensidad del verde,
+ y el canal **B** (blue) la intensidad del azul.

El color resultante se forma con estos tres canales.


# Mezclador interactivo

**Podés arrastrar los deslizadores** para cambiar la intensidad de los colores y ver el resultado.

<div id="sliders-colores">
<label>Canal R: <br><input type="range" min="0" max="255" class="slider-R" value="0" style="width:100%"/></label><br>
<label>Canal G: <br><input type="range" min="0" max="255" class="slider-G" value="0" style="width:100%"/></label><br>
<label>Canal B: <br><input type="range" min="0" max="255" class="slider-B" value="0" style="width:100%"/></label><br>
<br>

<svg class="resultado-R" width="100%" height="160px">
    <rect width="50" height="50" fill="#000" class="color-R"/>
    <rect width="50" height="50" fill="#000" y="55" class="color-G"/>
    <rect width="50" height="50" fill="#000" y="110" class="color-B"/>
    <rect width="100%" height="160" fill="#000" x="55" class="color-RGB"/>
    <rect width="50" height="18" y="32" fill="#fff" opacity="0.5" />
    <rect width="50" height="18" y="88" fill="#fff" opacity="0.5" />
    <rect width="50" height="18" y="142" fill="#fff" opacity="0.5" />
    <text x="4" font-size="14" y="44" class="texto-R" fill="#000">R:0</text>
    <text x="4" font-size="14" y="100" class="texto-G" fill="#000">G:0</text>
    <text x="4" font-size="14" y="154" class="texto-B" fill="#000">B:0</text>
</svg>
</div>

# Cómo escribimos colores

La forma más común y compacta de escribirlos es utilizando el **sistema hexadecimal**. Donde el sistema binario permite 2 caracteres diferentes y el decimal 10 caracteres diferentes, el hexadecimal usa 16.

<label>Probá **arrastrando el marcador**:
<input id="conversion-sistemas" type="range" min="0" max="255" value="0" style="width:100%" />
</label>

* Decimal: <code id="conversion-dec">0</code>
* Binario: <code id="conversion-bin">0</code>
* Hexadecimal: <code id="conversion-hex">0</code>

Los colores RGB siguen la forma **#RRGGBB**, reemplazando cada grupo de letras por el valor del canal en sistema hexadecimal.

* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#000000"/></svg> = `#000000` = R:0, G:0, B:0
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#ffffff"/></svg> = `#ffffff` = R:255, G:255, B:255
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#ff0000"/></svg> = `#FF0000` = R:255, G:0, B:0
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#0055FF"/></svg> = `#0055FF` = R:255, G:255, B:255
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#58afd2"/></svg> = `#58AFD2` = R:88, G:175, B:210

También existe la forma corta **#RGB** que se puede usar si los caracteres de los 3 canales se repiten.

* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#000000"/></svg> = `#000000` = `#000`
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#ffffff"/></svg> = `#ffffff` = `#fff`
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#ff0000"/></svg> = `#FF0000` = `#F00`
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#0055FF"/></svg> = `#0055FF` = `#05F`
* <svg width="16px" height="16px"><rect width="100%" height="100%" fill="#58afd2"/></svg> = `#58AFD2` = **NO SE PUEDE!**

## Otros modelos de color

Si bien al final del recorrido el píxel *debe* convertirse a RGB para poder mostrarse en pantalla, durante el camino puede convertirse a otros modelos para aprovechar sus propiedades.

Por ejemplo, el **modelo HSL** trata los canales como tono, saturación y luminosidad. El tono se ubica en un círculo de colores de 360° y los otros dos canales van del 0 al 100%.

Con esto se hace fácil crear armonías:

* rotando el tono 180° se obtiene el **color complementario**,
* los **colores análogos** están a 22.5°,
* para hacer un esquema **monocromático** se puede modificar sólo el componente S o el L

# Cierre
Espero que te hayas llevado algo nuevo.<br>Por lo menos lo de las palomas.
