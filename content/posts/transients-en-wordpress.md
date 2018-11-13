---
title: "Transients en WordPress"
date: 2018-10-29T20:00:00-03:00
categorias: ["WordPress", "Transients API"]
---

El **API de transients** de WordPress es un conjunto de funciones que permiten guardar cualquier tipo de información en la base de datos de una forma similar al API de opciones, pero *de manera temporal*, es decir que la información se elimina pasado cierto tiempo. Esto es útil cuando trabajamos con servicios externos y guardamos la respuesta en caché para reducir la latencia de utilizar tales servicios.

El API está formado por 3 funciones: `get_transient` para buscar datos, `set_transient` para agregar o actualizar datos y `delete_transient` para eliminarlos.

Por ejemplo:

```php
function obtenerTemperatura() {
    $temperatura = get_transient('temperatura-en-concordia');

    if ($temperatura === false) {
        $temperatura = buscarTemperaturaEnInternet();
        set_transient('temperatura-en-concordia', $temperatura, 60 * 30);
    }

    return $temperatura;
}
```

`get_transient()` retorna el valor del nombre *temperatura-en-concordia* (por ejemplo un string `'23 °C'`) o el booleano *false*. En ese caso se busca un nuevo valor y se guarda en un transient con una validez máxima de 30 minutos, antes de retornarlo. El tiempo máximo de validez debe estar especificado en segundos, en este caso 60 segundos multiplicado por 30, o sea 30 minutos.

Para manejar tiempos grandes WordPress tiene constantes muy útiles:

```php
MINUTE_IN_SECONDS = 60 (seconds)
HOUR_IN_SECONDS   = 60 * MINUTE_IN_SECONDS
DAY_IN_SECONDS    = 24 * HOUR_IN_SECONDS
WEEK_IN_SECONDS   = 7 * DAY_IN_SECONDS
MONTH_IN_SECONDS  = 30 * DAY_IN_SECONDS
YEAR_IN_SECONDS   = 365 * DAY_IN_SECONDS
```

Así se puede definir 3 semanas como `3 * WEEK_IN_SECONDS` en vez de `60 * 60 * 24 * 7 * 3`. En el ejemplo anterior podría haberlo utilizado así, para hacerlo más fácil de leer:

```php
set_transient('temperatura-en-concordia', $temperatura, 30 * MINUTE_IN_SECONDS);
```

## Trabajar con caché durante el desarrollo

Desarrollar con caché activado es algo muy molesto porque no podemos ver los cambios que realizamos, justamente porque están en caché. Una manera de resolver esto es así:

```php
function obtenerTemperatura() {
    $temperatura = get_transient('temperatura-en-concordia');

    if ($temperatura === false || WP_DEBUG) {
        $temperatura = buscarTemperaturaEnInternet();
        set_transient('temperatura-en-concordia', $temperatura, 60 * 30);
    }

    return $temperatura;
}
```

Si tenemos definida la constante `WP_DEBUG` en `true` (que deberías tenerla si estás desarrollando) la expresión del `if()` siempre va a dar `true` y va a devolver el valor no cacheado.


## ¿Sólo es útil para APIs de terceros?

Es importante tener en cuenta que los transients **no son sólo para servicios externos**. Podemos guardar cualquier tipo de información que se beneficie de existir en caché.

Si la función `calcularVentasMesAnterior()` demora 20 segundos en recorrer cientos de miles de ventas en más de cien sucursales, podemos guardar el resultado ya que no va a cambiar hasta el mes siguiente.

Por supuesto, la primera vez que se ejecuta va a demorar. El API de transients no es mágico, pero sí es una herramienta muy útil dentro de todo lo que ofrece WordPress.
