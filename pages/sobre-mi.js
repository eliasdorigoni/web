import Layout from "~/components/Layout";

export default function SobreMi() {
  return (
    <Layout>
      <div class="content">
        <h2>Hola!</h2>

        <p>Soy un desarrollador PHP SR ubicado en Cordoba capital desde 2019.</p>

        <p>Actualmente trabajo en el departamento de I+D de La Voz del Interior, desarrollando sitios
        en Laravel de uso interno que se integran con sistemas propios y de terceros a través de APIs REST y SOAP.
        Previamente desarrollé más de 40 sitios web en WordPress para diferentes clientes: sitios institucionales,
        tiendas online, landings, diarios digitales, sitios con mucha actividad, etc. Desarrollé themes y
        plugins desde cero.
        Tengo experiencia trabajando con diferentes APIs como la de Google Maps, Dropbox, Twitter,
        Facebook y OpenWeather. Últimamente estuve interactuando con la de Twitch.
        </p>

        <h2>Tecnologías</h2>

        <h3>Lenguajes de programación y sistemas</h3>
        <p><strong>PHP</strong> es mi lenguaje principal y Laravel mi framework de preferencia.</p>
        <p>Hice algunos proyectos en Python y C#, pero nada muy avanzado.
        Para herramientas rápidas o tareas repetitivas suelo usar Bash, o Python si es un poquito más complejo.
        Fuera del trabajo y como hobby hago cosas con Arduino, asi que sé un poco de la variante de C++ que usa.
        En cuanto a sistemas operativos uso Ubuntu en lo laboral, Linux Mint o Raspbian
        para proyectos personales y Windows para el tiempo de ocio.
        Conozco y trabajo en servidores corriendo en instancias de Docker.</p>

        <h3>Bases de datos</h3>
        <p>Utilizo <strong>MySQL</strong> o <strong>MariaDB</strong> para trabajar con PHP,
        y <strong>SQLite</strong> para los tests automatizados de Laravel.</p>
        <p>Trabajé con bases existentes en SQL Server en software legacy hecho en .NET.</p>

        <h3>Hojas de estilos</h3>
        <p>Uso CSS desde que no existían los preprocesadores. He usado SASS con el procesador
        original de Ruby, con el de GulpJS, con el de webpack, dentro de componentes de VueJS, etc.</p>

        <p>Hoy en día me gusta armar proyectos usando Tailwind, lo encuentro más práctico.</p>

        <h3>Javascript</h3>
        <p>Hasta ahora no desarrollé apps que sean 100% javascript, siempre los scripts fueron "agregados"
        al proyecto. Sin embargo conozco Vue, webpack, jQuery, y Javascript tradicional.
        He preparado task runners en Grunt y Gulp (como este sitio).</p>

        <h3>GIT</h3>
        <p>
          Uso Bitbucket en lo laboral (por el ecosistema de Atlassian) y GitHub para lo personal.
          He usado GitLab anteriormente.
        </p>
      </div>
    </Layout>
  )
}

