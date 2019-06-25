---
title: "Proyecto Pacman"
date: 2019-06-24T21:59:53-03:00
description: Intentando nuevas cosas
categorias: ["Pacman"]
---

El mundo no necesita más _to-do_ apps. Para aprender nuevas tecnologías hay que tener un proyecto interesante y completamente inútil.

Como un juego. Como **Pacman**.

La idea es aprender componentes de Vue y state management, gráficos SVG, animaciones, pathfinding para los fantasmas, quizás sonidos y lo que me encuentre en el camino.

# Qué me espera.

El laberinto de Pacman es un área rectangular de 21x27 bloques cuadrados, con dos pasillos en el medio del mapa conectados entre sí, que permiten a Pacman y los fantasmas teletransportarse al otro lado.

Cada bloque del mapa puede ser uno de estos 9 tipos:

|Gráfico|Nombre|Descripción|
|---|---|---|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M10 7H0V6H10V7Z" fill="#004AA5"/><path d="M10 3H0V4H10V3Z" fill="#004AA5"/></svg>|Pared|Instransitable.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><rect width="10" height="10" transform="translate(10) rotate(90)" fill="black"/><path d="M10 7V6L4 6L4 4.37114e-08L3 0L3 6C3 6.55228 3.44771 7 4 7L10 7Z" fill="#004AA5"/><path d="M6 1.31134e-07L7 1.74846e-07L7 3L10 3V4L6 4L6 1.31134e-07Z" fill="#004AA5"/></g><defs><clipPath id="clip0"><rect width="10" height="10" fill="white" transform="translate(10) rotate(90)"/></clipPath></defs></svg>|Esquina|Instransitable.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M0 3H3V0H4V4H0V3Z" fill="#004AA5"/><path d="M10 7H0V6H10V7Z" fill="#004AA5"/><path d="M7 0L7 3H10V4H6L6 0H7Z" fill="#004AA5"/></svg>|Intersección|Instransitable.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M0 7H6C6.55228 7 7 6.55228 7 6V4C7 3.44772 6.55228 3 6 3H0V4H6V6H0V7Z" fill="#004AA5"/></svg>|Fin de pared|Instransitable.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><rect width="10" height="10" fill="black"/><rect x="-0.5" y="3.5" width="7" height="3" stroke="#004AA5" stroke-linejoin="round"/><rect x="7" y="5" width="3" height="1" fill="#004AA5"/></g><defs><clipPath id="clip0"><rect width="10" height="10" fill="white"/></clipPath></defs></svg>|Borde de caja de salida de fantasmas|Instransitable.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><rect y="5" width="10" height="1" fill="#004AA5"/></svg>|"Puerta" de la caja de fantasmas|Los fantasmas pueden cruzar, Pacman no.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><rect x="4" y="4" width="2" height="2" fill="#B56B29"/></svg>|Punto|El objetivo del juego: "comer" todos los puntos.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><circle cx="5" cy="5" r="3" fill="#B56B29"/></svg>|Power-up|Forma parte del objetivo y permite a Pacman "comer" los fantasmas por un tiempo limitado.|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/></svg>|Espacio vacío|Es transitable si Pacman o sus enemigos tienen acceso directo.|

Sobre estos bloques pueden o no transitar Pacman y sus enemigos:

|Gráfico|Nombre|Propiedades|
|---|---|---|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25483 7.62742C8.37365 9.05137 6.79761 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C6.79761 0 8.37365 0.948627 9.25483 2.37258L4 5L9.25483 7.62742Z" fill="#B56B29"/></svg>|Pacman|Controlable en 4 direcciones (&#8596; &#8597;).|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M8.19666 10C7.60254 10 7.11918 9.51664 7.11918 8.92252C7.11918 8.65148 6.89867 8.43098 6.62764 8.43098C6.3566 8.43098 6.1361 8.65148 6.1361 8.92252C6.13612 9.51664 5.65276 10 5.05864 10C4.46451 10 3.98116 9.51664 3.98116 8.92252C3.98116 8.65148 3.76065 8.43098 3.48961 8.43098C3.21858 8.43098 2.99807 8.65148 2.99807 8.92252C2.99807 9.51664 2.51471 10 1.92059 10C1.32647 10 0.843109 9.51664 0.843109 8.92252V4.21549C0.843148 1.89029 2.731 0 5.05864 0C7.38389 0 9.27412 1.88789 9.27412 4.21549V8.92252C9.27412 9.51664 8.79078 10 8.19666 10Z" fill="#FF0000"/><path d="M7.31289 5.59082C6.55453 5.59082 5.93756 4.97384 5.93756 4.21548C5.93756 3.45712 6.55453 2.84015 7.31289 2.84015C8.07125 2.84015 8.68822 3.45712 8.68822 4.21548C8.68821 4.97384 8.07125 5.59082 7.31289 5.59082Z" fill="white"/><path d="M7.7 5.4C8.0866 5.4 8.4 5.0866 8.4 4.7C8.4 4.3134 8.0866 4 7.7 4C7.3134 4 7 4.3134 7 4.7C7 5.0866 7.3134 5.4 7.7 5.4Z" fill="#1413E1"/><path d="M3.37533 5.59082C2.61697 5.59082 2 4.97384 2 4.21548C2 3.45712 2.61697 2.84015 3.37533 2.84015C4.13369 2.84015 4.75066 3.45712 4.75066 4.21548C4.75064 4.97384 4.13369 5.59082 3.37533 5.59082Z" fill="white"/><path d="M3.76244 5.4C4.14904 5.4 4.46244 5.0866 4.46244 4.7C4.46244 4.3134 4.14904 4 3.76244 4C3.37584 4 3.06244 4.3134 3.06244 4.7C3.06244 5.0866 3.37584 5.4 3.76244 5.4Z" fill="#1413E1"/></svg>|Blinky|Después de que Pac-Man coma cierta cantidad de puntos, su velocidad incrementa considerablemente (Wikipedia)|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M8.19666 10C7.60254 10 7.11918 9.51664 7.11918 8.92252C7.11918 8.65148 6.89867 8.43098 6.62764 8.43098C6.3566 8.43098 6.1361 8.65148 6.1361 8.92252C6.13612 9.51664 5.65276 10 5.05864 10C4.46451 10 3.98116 9.51664 3.98116 8.92252C3.98116 8.65148 3.76065 8.43098 3.48961 8.43098C3.21858 8.43098 2.99807 8.65148 2.99807 8.92252C2.99807 9.51664 2.51471 10 1.92059 10C1.32647 10 0.843109 9.51664 0.843109 8.92252V4.21549C0.843148 1.89029 2.731 0 5.05864 0C7.38389 0 9.27412 1.88789 9.27412 4.21549V8.92252C9.27412 9.51664 8.79078 10 8.19666 10Z" fill="#06e2ff"/><path d="M7.31289 5.59083C6.55453 5.59083 5.93756 4.97386 5.93756 4.2155C5.93756 3.45714 6.55453 2.84016 7.31289 2.84016C8.07125 2.84016 8.68822 3.45714 8.68822 4.2155C8.68821 4.97386 8.07125 5.59083 7.31289 5.59083Z" fill="white"/><path d="M7.7 5.4C8.0866 5.4 8.4 5.0866 8.4 4.7C8.4 4.3134 8.0866 4 7.7 4C7.3134 4 7 4.3134 7 4.7C7 5.0866 7.3134 5.4 7.7 5.4Z" fill="#1413E1"/><path d="M3.37533 5.59082C2.61697 5.59082 2 4.97384 2 4.21548C2 3.45712 2.61697 2.84015 3.37533 2.84015C4.13369 2.84015 4.75066 3.45712 4.75066 4.21548C4.75064 4.97384 4.13369 5.59082 3.37533 5.59082Z" fill="white"/><path d="M3.76244 5.4C4.14904 5.4 4.46244 5.0866 4.46244 4.7C4.46244 4.3134 4.14904 4 3.76244 4C3.37584 4 3.06244 4.3134 3.06244 4.7C3.06244 5.0866 3.37584 5.4 3.76244 5.4Z" fill="#1413E1"/></svg>|Inky|No es tan rápido como Blinky pero actúa de manera errática así que es difícil predecir cómo va a reaccionar. En el juego original de Japón (Puck-Man) este fantasma solía evitar a Pac-Man y era considerado temeroso. (Wikipedia).|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M8.19666 10C7.60254 10 7.11918 9.51664 7.11918 8.92252C7.11918 8.65148 6.89867 8.43098 6.62764 8.43098C6.3566 8.43098 6.1361 8.65148 6.1361 8.92252C6.13612 9.51664 5.65276 10 5.05864 10C4.46451 10 3.98116 9.51664 3.98116 8.92252C3.98116 8.65148 3.76065 8.43098 3.48961 8.43098C3.21858 8.43098 2.99807 8.65148 2.99807 8.92252C2.99807 9.51664 2.51471 10 1.92059 10C1.32647 10 0.843109 9.51664 0.843109 8.92252V4.21549C0.843148 1.89029 2.731 0 5.05864 0C7.38389 0 9.27412 1.88789 9.27412 4.21549V8.92252C9.27412 9.51664 8.79078 10 8.19666 10Z" fill="#FFB9DF"/><path d="M7.31289 5.59083C6.55453 5.59083 5.93756 4.97386 5.93756 4.2155C5.93756 3.45714 6.55453 2.84016 7.31289 2.84016C8.07125 2.84016 8.68822 3.45714 8.68822 4.2155C8.68821 4.97386 8.07125 5.59083 7.31289 5.59083Z" fill="white"/><path d="M7.7 5.4C8.0866 5.4 8.4 5.0866 8.4 4.7C8.4 4.3134 8.0866 4 7.7 4C7.3134 4 7 4.3134 7 4.7C7 5.0866 7.3134 5.4 7.7 5.4Z" fill="#1413E1"/><path d="M3.37533 5.59082C2.61697 5.59082 2 4.97384 2 4.21548C2 3.45712 2.61697 2.84015 3.37533 2.84015C4.13369 2.84015 4.75066 3.45712 4.75066 4.21548C4.75064 4.97384 4.13369 5.59082 3.37533 5.59082Z" fill="white"/><path d="M3.76244 5.4C4.14904 5.4 4.46244 5.0866 4.46244 4.7C4.46244 4.3134 4.14904 4 3.76244 4C3.37584 4 3.06244 4.3134 3.06244 4.7C3.06244 5.0866 3.37584 5.4 3.76244 5.4Z" fill="#1413E1"/></svg>|Pinky|Rodea los obstáculos al contrario de las manecillas del reloj. Esta suele colocarse en frente de pacman y cortarle el paso u orbita alrededor de Pac-Man para confundir y distraer al jugador para que uno de sus compañeros lo atrape (Wikipedia).|
|<svg width="40" height="40" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="black"/><path d="M8.19666 10C7.60254 10 7.11918 9.51664 7.11918 8.92252C7.11918 8.65148 6.89867 8.43098 6.62764 8.43098C6.3566 8.43098 6.1361 8.65148 6.1361 8.92252C6.13612 9.51664 5.65276 10 5.05864 10C4.46451 10 3.98116 9.51664 3.98116 8.92252C3.98116 8.65148 3.76065 8.43098 3.48961 8.43098C3.21858 8.43098 2.99807 8.65148 2.99807 8.92252C2.99807 9.51664 2.51471 10 1.92059 10C1.32647 10 0.843109 9.51664 0.843109 8.92252V4.21549C0.843148 1.89029 2.731 0 5.05864 0C7.38389 0 9.27412 1.88789 9.27412 4.21549V8.92252C9.27412 9.51664 8.79078 10 8.19666 10Z" fill="#FFBA46"/><path d="M7.31289 5.59083C6.55453 5.59083 5.93756 4.97386 5.93756 4.2155C5.93756 3.45714 6.55453 2.84016 7.31289 2.84016C8.07125 2.84016 8.68822 3.45714 8.68822 4.2155C8.68821 4.97386 8.07125 5.59083 7.31289 5.59083Z" fill="white"/><path d="M7.7 5.4C8.0866 5.4 8.4 5.0866 8.4 4.7C8.4 4.3134 8.0866 4 7.7 4C7.3134 4 7 4.3134 7 4.7C7 5.0866 7.3134 5.4 7.7 5.4Z" fill="#1413E1"/><path d="M3.37533 5.59082C2.61697 5.59082 2 4.97384 2 4.21548C2 3.45712 2.61697 2.84015 3.37533 2.84015C4.13369 2.84015 4.75066 3.45712 4.75066 4.21548C4.75064 4.97384 4.13369 5.59082 3.37533 5.59082Z" fill="white"/><path d="M3.76244 5.4C4.14904 5.4 4.46244 5.0866 4.46244 4.7C4.46244 4.3134 4.14904 4 3.76244 4C3.37584 4 3.06244 4.3134 3.06244 4.7C3.06244 5.0866 3.37584 5.4 3.76244 5.4Z" fill="#1413E1"/></svg>|Clyde|Él no persigue a Pac-Man, sino que deambula por el laberinto sin una ruta específica (Wikipedia).|

Ya con las cosas claras, este es el diseño del laberinto que armé:

<iframe style="border: none;" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FdSJUpuj37BYPiDyyyxJD174w%2FLayout%3Fnode-id%3D1%253A245" allowfullscreen></iframe>

(<a href="https://www.figma.com/file/dSJUpuj37BYPiDyyyxJD174w/Layout?node-id=0%3A1" target="_blank">link</a>)

Es el laberinto clásico con los pasillos de teletransporte.

# Por dónde empezar.

<svg width="64" height="64" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M103.82,116.81c0-16.77-11.21-30.59-25.93-30.59c-2.4,0-8.14-0.21-13.88-0.32V128l25.04,0l0-7.6 c3.76,4.9,7.6,7.6,11.8,7.59c1.34,0,2.97-0.04,2.97,0.01C103.82,127.97,103.82,116.81,103.82,116.81z" style="fill:#00BFA5;"/>
    <g>
      <g>
        <path id="XMLID_1375_" d="M107.68,75.67c3.54-0.69,5.67-1.75,9.57-4.84c0.06,0.16,6.99-5.96,9.93-11.38 c1.04-1.92-0.44-3.74-1.62-2.42c-3.03,4.09-8.77,8.62-8.93,8.34l0,0c-0.7-2.44-3.66-1.12-5.2-0.16 c-2.35,1.54-4.81,2.79-7.34,3.73C99.68,70.37,103.15,76.31,107.68,75.67z" style="fill:#BF8F68;"/>
        <path d="M104.14,68.93c0,0-1.95,0.38-2.61,2.87c-0.23,0.89-0.21,2.04-0.14,3.56l-0.02,1.78l5.53,1.92 l4.76-1.12c0,0,0.92-3.68,2.88-5.1l-4.89-1.28L104.14,68.93z" style="fill:#BF8F68;"/>
      </g>
      <g>
        <defs>
          <path id="XMLID_1374_" d="M102.77,128c6.51,0,11.76-5.35,11.63-11.86l-0.26-39.47c-0.02-0.73-0.6-1.33-1.33-1.38l-11.74-0.68 c-0.76-0.05-1.43,0.5-1.52,1.26L94.11,118C93.34,123.27,97.43,128,102.77,128L102.77,128z"/>
        </defs>
        <use style="overflow:visible;fill:#00BFA5;" xlink:href="#XMLID_1374_"/>
        <clipPath id="XMLID_3_">
          <use style="overflow:visible;" xlink:href="#XMLID_1374_"/>
        </clipPath>
      </g>
    </g>
    <polygon id="XMLID_1363_" points="92.8,106.95 95.23,109.71 97.09,96.12 94.67,93.36 " style="opacity:0.54;"/>
  </g>
  <path d="M24.18,116.81c0-16.77,11.21-30.59,25.93-30.59c2.4,0,8.14-0.21,13.88-0.32V128l-25.04,0l0-7.6 c-3.76,4.9-7.6,7.6-11.8,7.59c-1.34,0-2.97-0.04-2.97,0.01C24.18,127.97,24.18,116.81,24.18,116.81z" style="fill:#00BFA5;"/>
  <path id="XMLID_1361_" d="M64.41,102.06L64.41,102.06c-4.82,0-8.64-3.91-8.64-8.73V85.8h17.28v7.53 C73.05,98.16,69.23,102.06,64.41,102.06z" style="fill:#99674F;"/>
  <g>
    <g>
      <path id="XMLID_1372_" d="M20.32,75.67c-3.54-0.69-5.67-1.75-9.57-4.84c-0.06,0.16-6.99-5.96-9.93-11.38 c-1.04-1.92,0.44-3.74,1.62-2.42c3.03,4.09,8.77,8.62,8.93,8.34l0,0c0.7-2.44,3.66-1.12,5.2-0.16c2.35,1.54,4.81,2.79,7.34,3.73 C28.32,70.37,24.85,76.31,20.32,75.67z" style="fill:#BF8F68;"/>
      <path d="M23.86,68.93c0,0,1.95,0.38,2.61,2.87c0.23,0.89,0.21,2.04,0.14,3.56l0.02,1.78l-5.53,1.92 l-4.76-1.12c0,0-0.92-3.68-2.88-5.1l4.89-1.28L23.86,68.93z" style="fill:#BF8F68;"/>
    </g>
    <g>
      <defs>
        <path id="XMLID_1371_" d="M25.23,128c-6.51,0-11.76-5.35-11.63-11.86l0.26-39.47c0.02-0.73,0.6-1.33,1.33-1.38l11.74-0.68 c0.76-0.05,1.43,0.5,1.52,1.26L33.89,118C34.66,123.27,30.57,128,25.23,128L25.23,128z"/>
      </defs>
      <use style="overflow:visible;fill:#00BFA5;" xlink:href="#XMLID_1371_"/>
      <clipPath id="XMLID_7_">
        <use style="overflow:visible;" xlink:href="#XMLID_1371_"/>
      </clipPath>
    </g>
  </g>
  <polygon id="XMLID_1373_" points="35.2,106.95 32.77,109.71 30.91,96.12 33.33,93.36 " style="opacity:0.54;"/>
  <g>
    <path id="XMLID_6_" d="M89.76,57.33c0,0,5.04-0.08,6.03,5.17c0.88,4.63-2.33,7.14-5.89,7.81l-2.38-12.56 L89.76,57.33z" style="fill:#99674F;"/>
    <path id="XMLID_5_" d="M36.58,67.41c0,0-4.72,1.77-3.72,7.02c0.88,4.63,4.78,5.79,8.34,5.11l-2.38-12.56 L36.58,67.41z" style="fill:#99674F;"/>
    <path id="XMLID_4_" d="M56.65,27.98C35.63,31.96,33.22,49.3,37.56,72.18c4.5,23.73,20.92,26.97,32.18,24.84 c11.1-2.1,25.38-10.99,20.85-34.9C86.25,39.24,77.66,23.99,56.65,27.98z" style="fill:#BF8F68;"/>
    <path id="XMLID_1_" d="M56.71,24.87c0,0-0.41,0.07-0.59,0.1c-0.18,0.03-0.59,0.12-0.59,0.12 c-22.6,4.74-26.84,19.68-25.05,29.14c1.74,9.19,3.03,15.95,3.03,15.95s0.29-0.44,0.86-1.09c0.61-0.69,1.33-1.15,1.33-1.15l2.6,7.46 l4.56-17.22C42.9,58.08,43,58,43.11,57.99l4.57-0.35c4.6-0.35,9.16-0.97,13.69-1.81l0,0.01c0.2-0.04,0.39-0.08,0.59-0.12 c0.2-0.04,0.39-0.07,0.59-0.11l0-0.01c4.52-0.87,9-1.97,13.4-3.32l4.38-1.35c0.11-0.03,0.22,0.01,0.28,0.1l10.55,14.35l-0.31-7.9 c0,0,0.85,0.16,1.66,0.58c0.77,0.39,1.2,0.7,1.2,0.7s-1.27-6.76-3.02-15.95C88.9,33.35,79.47,21,56.71,24.87z" style="fill:#6D4C41;"/>
  </g>
  <g>
    <path id="XMLID_1346_" d="M69.57,77.16c-1.15,0.59-2.39,1.01-3.37,1.2c-0.98,0.19-2.28,0.27-3.57,0.17 c-0.55-0.04-0.66,0.49-0.41,0.78c0.52,0.61,2.35,1.67,4.42,1.27c2.06-0.41,3.35-2.09,3.6-2.85C70.37,77.36,70.07,76.9,69.57,77.16z " style="fill:#99674F;"/>
    <path id="XMLID_1345_" d="M71.01,87.59c0.28,1.44-0.94,1.99-2.53,2.31c-1.59,0.31-2.94,0.23-3.21-1.17 c-0.29-1.48,0.81-2.65,2.4-2.96S70.71,86.08,71.01,87.59z" style="fill:#49362E;"/>
    <path id="XMLID_1344_" d="M56.6,72.07c0.45,2.26-0.71,4.4-2.58,4.77c-1.87,0.37-3.76-1.16-4.21-3.43 c-0.45-2.27,0.71-4.4,2.59-4.77C54.28,68.27,56.15,69.8,56.6,72.07" style="fill:#49362E;"/>
    <path id="XMLID_1337_" d="M73.31,68.77c0.45,2.26,2.32,3.8,4.21,3.43c1.87-0.37,3.03-2.5,2.59-4.77 c-0.45-2.27-2.33-3.8-4.2-3.43C74.02,64.37,72.87,66.51,73.31,68.77" style="fill:#49362E;"/>
  </g>
</svg>

Ni idea. Por lo pronto voy a dejar el proyecto principal en <a href="https://github.com/eliasdorigoni/pacman" target="_blank">GitHub</a> y las ideas que se me ocurran en <a href="https://codepen.io/collection/AGvWGL/" target="_blank">CodePen</a>. Según avance iré publicando.
