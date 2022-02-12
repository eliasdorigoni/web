---
title: "Copiar archivos entre servidores sin conexión directa"
date: "2021-12-22T15:01:00-03:00"
description: "Tirando cables donde no hay."
categories: ["SSH", "Linux"]
---

Por cuestiones de la vida tenía la tarea de conectarme a un servidor, subir unos nuevos certificados SSL y ponerlos a andar. Pero cuando te conectas a través de un <a href="https://es.wikipedia.org/wiki/Bastion_host" rel="noopener" target="_blank">servidor bastión</a> o similar, probablemente no tengas las credenciales de ese servidor, lo que dificulta copiar archivos con el comando <a href="https://man7.org/linux/man-pages/man1/scp.1.html" rel="noopener" target="_blank">scp</a>.

Mi solución (y lo que explico en este post) consiste en abrir un tunel en mi ambiente local usando <a href="https://ngrok.com" rel="noopener" target="_blank">ngrok</a> y ejecutar `scp` en el ambiente remoto apuntando a este tunel. No se instala nada en el ambiente remoto y todos somos felices.

## Levantando el túnel

Lo primero es crearse una cuenta free en <a href="https://ngrok.com" rel="noopener" target="_blank">ngrok.com</a>, descargar e instalar ngrok en el ambiente local y configurarle el *authtoken* (está en el panel de usuario de la web de ngrok).

También es necesario instalar OpenSSH y tener el servicio corriendo:

```bash
service ssh status
```

Si está apagado...
```bash
sudo service ssh start
# Alternativa
sudo service ssh --full-restart
```

Por último hay que iniciar el túnel:
```bash
./ngrok tcp 22
```

La pantalla se va a limpiar y va a mostrar esto:
```markup
Session Status        online
Account               Elías Dorigoni (Plan: Free)
Version               2.3.40
Region                United States (us)
Web Interface         http://127.0.0.1:4040
Forwarding            tcp://4.tcp.ngrok.io:12345 -> localhost:22
```

Si está todo OK, la línea **Forwarding** tiene lo que nos interesa: la ruta pública (**4.tcp.ngrok.io**) y el puerto (**12345**).

## En el ambiente remoto...

Para copiar archivos se va a usar el comando `scp` de esta forma:

```bash
scp -P [ssh-port] [source] [target]
```

- `ssh-port` es el puerto indicado en la línea "Forwarding" de la conexión de ngrok (la primera parte).
- `source` es una ruta, el origen de los datos (de dónde leer).
- `target` es otra ruta, el destino de los datos (hacia dónde escribir).

Si la ruta es local sólo se escribe la misma, por ejemplo `~/logs/today.log`. En cambio si la ruta es remota hay que seguir el formato `user@server:path`, donde `user` es el nombre de usuario de Linux, `server` es la ruta pública del servidor (en este caso la ruta ofrecida por ngrok) y `path` es la ruta del archivo en cuestión.

> Para este post voy a asumir *linuxuser* como nombre de usuario.

Entonces para copiar un archivo desde el ambiente local al remoto, estando en el remoto, hay que ejecutar:
```bash
scp -P 12345 linuxuser@4.tcp.ngrok.io:/var/etc/example.zip ./
```

> En la primera conexión va a aparecer el aviso del fingerprint check, y luego va a pedir el password del usuario, que es el que se usa para autenticarse en el sistema local.

Para hacer el camino inverso, es decir copiar un archivo desde el ambiente remoto hacia el local, estando en el remoto:
```bash
scp -P 12345 ./example.zip linuxuser@4.tcp.ngrok.io
```

Para copiar un directorio recursivamente agregar los modificadores `-rp` (r para recursivo y p para mantener las fechas de los archivos). Por ejemplo:

```bash
scp -rp -P 12345 linuxuser@4.tcp.ngrok.io:~/downloads/fonts /var/www/public/fonts
```

Probablemente existan soluciones más simples pero mientras funcione sin instalar nada extra en el ambiente remoto ni dejando huecos de seguridad, para mí es una solución válida.
