---
title: "Hooks, filters y actions en WordPress"
date: "2018-03-01T16:00:00-03:00"
categories: ["WordPress"]
draft: true
---

El núcleo de WordPress y muchísimos plugins y themes permiten modificar sus opciones a través de **filtros** y **acciones**. Entender qué son y cómo usarlas nos permite personalizar secciones de manera simple, con la ventaja de mantener los cambios en cada actualización.

## Qué son los filtros?
Los **filtros** (o filters) son funciones de PHP que están agrupadas en un **hook**, un string
 que se aplican en secuencia a un valor. Cada función recibe valores de la anterior función y retorna valores para la siguiente, como en una línea de ensamblaje.




Por ejemplo, `get_the_title()` le aplica filtros al título antes de retornarlo:
```php
// wp-includes/post-template.php

function get_the_title( $post = 0 ) {

    // ...

    return apply_filters( 'the_title', $title, $id );
}
```

Los filtros que se aplican a `'the_title'` son:

```
```


```
$precio = 3;
$precio = $precio * 10;
$precio = $precio / 2;
$precio = $precio + 0.99;
echo $precio; // 15.99
```




## Permitir cambios sobre valores predeterminados.

Supongamos que desarrollamos un plugin que muestra los primeros seis eventos de un lugar:

```php
// Plugin:

function mostrarEventos() {
    $cantidad = 6;
    echo obtenerEventos($cantidad);
}
```

Para permitir a otros desarrolladores modificar la cantidad de eventos podemos aplicar filtros sobre el valor de `$cantidad` y usar el retorno:

```php
function mostrarEventos() {
    $cantidad = apply_filters('cantidad-eventos', 6);
    echo obtenerEventos($cantidad);
}
```

La función `apply_filters()` ejecuta todos los filtros -- es decir, **funciones de PHP** -- registrados en `cantidad-eventos` usando `6` como valor predeterminado.

## Usando filtros para modificar valores.

Supongamos que en nuestro theme queremos mostrar más que los seis eventos predefinidos. Para eso primero definimos la función que modifica la cantidad:

```php
function mostrarMasEventos($cantidad) {
    return $cantidad + 3:
}
```

y agregamos la función al mismo *hook* que se usa en `apply_filters()`:

```php
add_filter('cantidad-eventos', 'mostrarMasEventos', 10, 1);
```

Los primeros dos parámetros se explican solos.

El valor `10` indica la **prioridad**: las funciones se ejecutan en orden numérico ascendente, y si coinciden se sigue el orden en el que fueron registradas. Por defecto es `10`.

El valor `1` indica la **cantidad de parámetros** que acepta la función que agregamos. Si es necesario la función apply_filters puede enviar más parámetros a cada filtro:

```php
$variable = apply_filters($hook, $valor, $valorExtra1, $valorExtra2, [...]);
```

No es necesario que las funciones que definamos acepten todos los argumentos, pero
