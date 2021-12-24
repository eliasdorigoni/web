---
title: "Unit testing de plugins de WordPress, desde cero (XAMPP + Windows 10)"
date: "2017-10-20T10:00:00-03:00"
draft: true
---

La mayoría de tutoriales están hechos para Linux o Mac. Aquí se habla Windows!.

<!--more-->

No voy a hablar sobre lo bueno o malo de hacer testing o las técnicas del Test-Driven Development (TDD). El objetivo es unit testing, y eso haremos.

Al final de esta guía vamos a tener un plugin de **WordPress** (version 4.8.3) testeable con **PHPUnit** (version 4.8), ejecutandose sobre **PHP** (version 5.6.20) en el paquete **XAMPP** (misma versión que PHP), instalado en **Windows 10** (version 10, heh).
Si bien está disponible la versión 7 de PHP, *trabajamos con lo que tenemos*. Muchos hostings, buenos y malos, todavía ejecutan PHP 5.x, por lo tanto me voy a enfocar sobre la versión 5.6. Si tenes disponible PHP 7 en tu hosting usalo sin dudar. No deberían grandes diferencias.

---

Antes de empezar aclaro que esto no va a ser una guía sobre TDD (test-driven development) o las bondades de realizar testing, sino una ayuda para los que quieren utilizar PHPUnit para realizar tests sobre sus plugins de WordPress y no pueden hacer que funcione.

Todo se va a realizar sobre una máquina virtual limpia con Windows 10 instalado, para poder arrancar desde cero e ir solucionando los problemas que vayan apareciendo.

# Instalar XAMPP

**Importante 1:** siempre trata de que coincida la versión de PHP de XAMPP y la de tu servidor remoto que tenga instalado WordPress.
**Importante 2:** la versión de PHP va a indicar la versión de PHPUnit que puedas utilizar. Para PHP 5.x se usa PHPUnit 4.8, y para PHP 7.x se utiliza PHPUnit 5.x

Este paso es sencillo: ingresá a [Apache Friends](https://www.apachefriends.org/es/download.html) y descargá el paquete de XAMPP para Windows o directamente desde [SourceForge](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/). Como la mayoría de servidores todavía tienen PHP 5, para este tutorial voy a utilizar XAMPP con **PHP 5.6.31**

Una vez descargado se instala como cualquier software. Se recomienda instalarlo en la raiz del disco (que la ruta quede como `C://xampp/` o `D://xampp/`)


{EXPLICAR SOBRE LA INSTALACIÓN, LAS OPCIONES NECESARIAS}



# Instalar

<pre class="line-numbers"><code class="language-php">
if (!defined('ABSPATH')) exit;
function agregarSeccionAnaliticas($wp_customize) {
    $wp_customize->add_section('section-analytics', array(
        'title' => 'Analytics / Estadísticas de terceros',
        'priority' => 170,
        'capability' => 'edit_theme_options',
    ));
}
add_action('customize_register', 'agregarSeccionAnaliticas', 5);
</code></pre>

