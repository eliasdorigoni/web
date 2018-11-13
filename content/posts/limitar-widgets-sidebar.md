---
title: "Limitar y aleatorizar widgets de un sidebar"
date: 2018-08-07T17:00:00-03:00
lastmod: 2018-08-10T15:00:00-03:00
categorias: ["WordPress"]
draft: true
---

En este artículo vamos a filtrar los widgets de un sidebar para limitar la cantidad a mostrar, y los vamos a ordenar aleatoriamente. Estas funciones se pueden aplicar a muchos casos, pero originalmente lo realicé para mostrar banners publicitarios usando widgets de imagen. 

Si instalar un plugin resulta *overkill* podemos usar este snippet, que es sencillo de utilizar y fácil de integrar.

```php
function limitarWidgetsBarraLateral($sidebars_widgets) {
    // Sidebar a editar
    $id = 'barra-lateral';

    // Cantidad de widgets a mostrar
    $maxWidgets = 3;

    // Nos aseguramos de filtrar en el frontend y si hay contenido.
    if (is_admin() || empty($sidebars_widgets[$id])) {
        return $sidebars_widgets;
    }

    // Sólo limitamos la cantidad si hay suficiente para limitar.
    if (count($sidebars_widgets[$id]) > $maxWidgets) {
        $randomKeys = array_rand($sidebars_widgets[$id], $maxWidgets);
        if (!is_array($randomKeys)) {
            $randomKeys = array($randomKeys);
        }
        $sidebars_widgets[$id] = array_intersect_key(
            $sidebars_widgets[$id],
            array_flip($randomKeys)
        );
    }

    return $sidebars_widgets;
}
add_filter('sidebars_widgets', 'limitarWidgetsBarraLateral', 20);
```

Para buscar las claves al azar podríamos usar `rand(0, limite)` dentro de un loop e ir guardando las claves en `$randomKeys` (que lo hice en un principio), o podemos usar `array_rand()`.

La función clave es `array_rand()`, que retorna tantas claves al azar de `$sidebars_widgets[$id]` como se hayan definido en `$maxWidgets`. El retorno es un **array** si el límite es mayor a 1, **o un string** si el límite es 1.

Si bien las claves que elige `array_rand()` son aleatorias, el orden no lo es, por lo que si es necesario aleatorizar el orden, podemos hacerlo con `shuffle()`:

```php
function mezclarWidgetsBarraLateral($sidebars_widgets) {
    // Sidebar a editar
    $id = 'barra-lateral';

    // Cantidad de widgets a mostrar
    $maxWidgets = 3;

    // Nos aseguramos de filtrar en el frontend y si hay contenido.
    if (is_admin() || empty($sidebars_widgets[$id])) {
        return $sidebars_widgets;
    }
    
    // Mezclamos los widgets del sidebar.
    if (count($sidebars_widgets[$id]) > 1) {
        shuffle($sidebars_widgets[$id]);
    }

    return $sidebars_widgets;
}
add_filter('sidebars_widgets', 'mezclarWidgetsBarraLateral', 21);
```

