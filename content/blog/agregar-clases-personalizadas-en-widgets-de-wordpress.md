---
title: "Agregar clases personalizadas a widgets en WordPress"
date: 2018-01-23T14:55:36-03:00
draft: true
---

<!--more-->

Dependiendo de los requerimientos de un proyecto a veces es necesario identificar algunos widgets dentro un sidebar. Con esta técnica se pueden agregar clases CSS a todos los widgets de un sidebar, modificando la clase definida en `'before_widget'` al usar `register_sidebar()`.

```php
function agregarClaseIncrementalEnWidget($params = array()) {
    $sidebarEsperado = 'sidebar-1';

    if (is_admin() || !isset($params[0]['id']) || $params[0]['id'] !== $sidebarEsperado)) {
        return $params;
    }

    static $i = 0;
    $i++;
    $params[0]['before_widget'] = str_replace(
        'class="',
        'class="widget-' . $i . ' ',
        $params[0]['before_widget']
    );
    return $params;
}
add_filter('dynamic_sidebar_params', 'agregarClaseIncrementalEnWidget');
```

Esta función modifica el contenido de before_widget, agregando al principio de la propiedad HTML `class` la clase `widget-1`. La próxima será `widget-2`, `widget-3` y así.

**Limitaciones:** no va a hacer el reemplazo en `str_replace()` si no encuentra la cadena `class="`. Es necesario agregar la propiedad o modificar la lógica para tener esto en cuenta.
