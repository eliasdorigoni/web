---
title: "Cómo usar dominios personalizados en XAMPP"
date: 2018-11-12T09:00:00-03:00
categorias: ["XAMPP"]
---

¿Ya te cansaste de escribir <strong class="resaltado">http://localhost/wordpress/mi-proyecto/</strong>? ¿o de tener que poner `home_url()` antes de todas las rutas? Hay una forma mejor.

Al final de este post vamos a poder ver el contenido de <ins>http://localhost/wordpress/mi-proyecto/</ins> utilizando el dominio <ins>http://mi-proyecto.local/</ins>.

Esto está probado en **XAMPP 5.6.30** en Windows 10.

> **Importante**: hacé backup de lo que modifiques.

## Paso 1: redirigir el dominio a localhost
En primer lugar hay que indicarle a Windows que el dominio `http://mi-proyecto.local/` está en esta misma PC. Para esto hay que editar el archivo `<RUTA-DE-WINDOWS>/System32/drivers/etc/hosts` y agregar una nueva fila por cada dominio a redireccionar. En este caso se agrega `127.0.0.1   mi-proyecto.local`:

```hosts
# [...]
# localhost name resolution is handled within DNS itself.
#   127.0.0.1       localhost
#   ::1             localhost

127.0.0.1    mi-proyecto.local
```

Si ahora probamos ingresar con el navegador a <a href="http://mi-proyecto.local/" target="_blank" rel="noopener">http://mi-proyecto.local/</a> se debería ver el mismo contenido que si ingresamos a <a href="http://localhost/" target="_blank" rel="noopener">http://localhost/</a> (algunos navegadores requieren que la URL termine con una barra "/").

> * Se pueden agregar más dominios para otros proyectos, y no es necesario que sean *.local*. Pueden ser .dev, .test, etc.
* También se puede declarar una sola vez la IP y definir los dominios como una lista separada por espacios. Debería ser más rápido o eficiente que la forma tradicional, aunque en mi opinión es mucho menos legible.


## Paso 2: Relacionar dominio y carpetas

Apache puede servir más de un sitio web en la misma IP mediante <a href="https://httpd.apache.org/docs/2.4/vhosts/index.html" target="_blank">VirtualHost</a>.

En primer lugar XAMPP tiene que estar **completamente cerrado**. Hay que abrir el archivo `<RUTA-DE-XAMPP>\apache\conf\extra\httpd-vhosts.conf` y agregar uno de estos bloques `<VirtualHost>` por cada dominio:

```apacheconf
<VirtualHost mi-proyecto.local>
    # Permite definir subdominios. En este caso debe ser igual al definido en VirtualHost
    ServerName mi-proyecto.local

    # La raíz del proyecto, sin barra lateral.
    DocumentRoot "<RUTA-DE-XAMPP>/htdocs/wordpress/mi-proyecto"

    # Guarda todos los requests recibidos de este dominio en `<XAMPP>/apache/logs`.
    # La opción **common** configura el formato de cada línea como CLF (https://httpd.apache.org/docs/2.4/logs.html).
    CustomLog "logs/mi-proyecto.local.custom.log" common

    # Lo mismo que el anterior pero para errores.
    ErrorLog "logs/mi-proyecto.local.error.log"
</VirtualHost>
```

> En internet hay muchos otros tutoriales que usan otras directivas o valores. Este bloque es el que me funciona a mí. En internet hay otras configuraciones que se pueden probar, o de última siempre está disponible la [documentación de Virtual Hosts de Apache](https://httpd.apache.org/docs/2.4/vhosts/index.html) para revisar.

Después de iniciar o reiniciar Apache, al ingresar a <a href="http://mi-proyecto.local/" target="_blank" rel="noopener">http://mi-proyecto.local/</a> se debería el mismo contenido que <a href="http://localhost/wordpress/mi-proyecto/" target="_blank" rel="noopener">http://localhost/wordpress/mi-proyecto/</a> **A MENOS** que el proyecto esté en WordPress.

## Paso 3: cambiar el dominio en el proyecto
En muchos frameworks o CMS el dominio se guarda en el código o en la base de datos. Si está en el código, se cambia ahí. Si está en la base de datos se puede editar ingresando al sitio con la URL original, o editar la base de datos directamente con <a href="http://localhost/phpmyadmin/" target="_blank" rel="noopener">phpMyAdmin</a>.

En WordPress el nombre de dominio se guarda en las filas 1 y 2 de la columna `option_value` en la tabla `wp_options`. Si fisgoneás un poco te habrás dado cuenta que el dominio también se guarda en la columna `guid` de la tabla `wp_posts`, pero WordPress mismo advierte que <a href="https://codex.wordpress.org/Changing_The_Site_URL#Important_GUID_Note" target="_blank" rel="noopener">no es necesario ni recomendable editarlo</a>.

Y eso es todo.