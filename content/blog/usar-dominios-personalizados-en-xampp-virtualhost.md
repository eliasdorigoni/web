---
title: "Usar dominios personalizados en XAMPP (VirtualHost)"
date: 2018-01-26T20:56:20-03:00
draft: true
categorias:
    - "apache"
etiquetas: ["uno", "dos", "tres"]
---

Al trabajar en varios proyectos diferentes en XAMPP tarde o temprano se vuelve necesario organizarlos en carpetas, pero usar `http://localhost/mi-proyecto/` como la URL del proyecto hace que sea difícil utilizar URLs relativas, y es muy probable que no refleje la estructura de URLs del servidor de producción. 

En este post vamos a utilizar el dominio `http://mi-proyecto.local/` para ver el contenido `http://localhost/mi-proyecto/` mediante la directiva VirtualHosts de Apache.

> Algunas cosas a tener en cuenta:

> * esta guía fue escrita usando XAMPP 5.6.30 instalado en Windows 10,

> * como siempre, asegurate de tener copias de seguridad de todo lo que modifiques,

## Paso 1: redireccionar dominios a *localhost*

Todos los dominios apuntan a una IP.

[CONTINUAR]

Para indicar a Windows que la ruta `http://mi-proyecto.local/` es esta PC hay que editar el archivo `<RUTA-DE-WINDOWS>/System32/drivers/etc/hosts`, agregando una nueva fila por cada dominio a redireccionar:

```hosts
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#   127.0.0.1       localhost
#   ::1             localhost

127.0.0.1    mi-proyecto.local
```

Se pueden agregar más lineas para redireccionar otros dominios:
```hosts
127.0.0.1    proyecto-uno.local
127.0.0.1    proyecto-dos.local
```


> * por lo menos en Google Chrome es necesario que la ruta termine con "/" (**mi-proyecto.local/**)

## Paso 2: Editar httpd-vhosts.conf

Ahora que mi-proyecto.local/ redirecciona a localhost (o 127.0.0.1), Apache puede relacionar ese dominio con un directorio específico. En el archivo ubicado en `{INSTALACION-DE-XAMPP}\apache\conf\extra\httpd-vhosts.conf` hay que agregar uno de estos bloques por cada dominio:

```apacheconf
<VirtualHost mi-proyecto.local>
    ServerName mi-proyecto.local
    DocumentRoot "{INSTALACION-DE-XAMPP}/htdocs/mi-proyecto"
    CustomLog "logs/mi-proyecto.local.custom.log" common
    ErrorLog "logs/mi-proyecto.local.error.log"
</VirtualHost>
```

Vamos por partes:

- La directiva **VirtualHost** contiene otras directivas que aplican a un dominio en particular: en este caso, mi-proyecto.local/
- La directiva **ServerName** se usa para definir subdominios dentro de una misma IP, pero en este caso simplemente la usamos para definir el dominio de esta directiva. Hay que usar el mismo dominio que en VirtualHost.
- En **DocumentRoot** se define la raíz de la ruta del proyecto, sin barra al final. Esta ruta y todas las siguientes pueden ser absolutas, o relativas a la raíz de la carpeta de instalación de XAMPP. Por ejemplo, se puede configurar como `DocumentRoot "/htdocs/mi-proyecto"` o como `DocumentRoot "D://xampp/htdocs/mi-proyecto"`.

Las otras dos líneas son opcionales pero útiles:

- En **ErrorLog** se puede definir un archivo donde se van a guardar los registros de errores de Apache. De manera predeterminada todos los errores quedan guardados en `{XAMPP}/apache/logs/error.log`.
- La directiva **CustomLog** es similar, pero guarda los registros de los pedidos que realicen los clientes hacia el servidor. Por defecto quedan guardados en `{XAMPP}/logs/access.log`. La opción **common** configura la salida para que cada línea del registro siga el formato [CLF](https://httpd.apache.org/docs/2.4/logs.html).

## Cierre
En internet hay muchas formas de configurar dominios, en concreto las directivas usadas dentro del bloque *&lt;VirtualHost&gt;*. Las directivas descritas en este post son las que me funcionaron en diferentes equipos con Windows 7, 8 y 10. En caso de que no funcionen, siempre está disponible la [documentación de Virtual Hosts de Apache](https://httpd.apache.org/docs/2.4/vhosts/index.html) para revisar.
