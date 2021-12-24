import Layout from "~/components/Layout";

export default function SobreMi() {
  return (
    <Layout>
      <div class="content">
        <h2>Hola!</h2>

        <p>Soy un desarrollador PHP SR argentino, ubicado en Cordoba capital desde 2019.</p>

        <p>
          Actualmente trabajo en el departamento de I+D de La Voz del Interior, desarrollando apps
          en Laravel de uso interno que se integran con sistemas, tanto propios como de terceros, a través de APIs REST y SOAP.
          Previamente desarrollé más de 40 sitios web en WordPress para diferentes clientes: sitios institucionales,
          tiendas online, landings, diarios digitales, sitios con mucha actividad, etc. Desarrollé themes y
          plugins desde cero.
        </p>
        <p>
          Tengo experiencia trabajando con diferentes APIs como la de Google Maps,
          Dropbox, Twitter, Facebook y OpenWeather. Últimamente estuve interactuando con la de Twitch.
        </p>

        <h2>Tecnologías</h2>

        <h3>Lenguajes de programación y sistemas</h3>
        <p>
          <strong>PHP</strong> es mi lenguaje principal y <strong>Laravel</strong> mi framework de preferencia.
        </p>
        <p>
          Hice algunos proyectos en Python y C#, pero nada muy avanzado.
          Para herramientas rápidas o tareas repetitivas suelo usar Bash, o Python si es un poquito más complejo.
          Fuera del trabajo y como hobby hago cosas con Arduino, asi que sé un poco de la variante de C++ que usa.
          En cuanto a sistemas operativos uso Ubuntu en lo laboral, Linux Mint o Raspbian
          para proyectos personales y Windows para el tiempo de ocio.
          Conozco y trabajo en servidores corriendo en instancias de Docker.
        </p>

        <h3>Bases de datos</h3>
        <p>
          Utilizo <strong>MySQL</strong> o <strong>MariaDB</strong> para trabajar con PHP,
          y <strong>SQLite</strong> para los tests automatizados de Laravel.
        </p>
        <p>Trabajé con bases existentes en SQL Server en software legacy hecho en .NET.</p>

        <h3>Hojas de estilos</h3>
        <p>
          Uso CSS desde que no existían los preprocesadores. He usado SASS con el procesador
          original de Ruby, con el de GulpJS, con el de webpack, dentro de componentes de VueJS, etc.
        </p>

        <p>Hoy en día me gusta armar proyectos usando Tailwind, lo encuentro más práctico.</p>

        <h3>Javascript</h3>
        <p>El único proyecto 100% en javascript que realicé fue este sitio, que está hecho en NextJS.</p>
        <p>
          Laboralmente no desarrollé algo que sea 100% javascript, siempre fueron
          scripts agregados a proyectos que estan basados en otras tecnologías.
          Sin embargo trabajé mucho con Vue, jQuery, y Javascript tradicional.
        </p>
        <p>Tengo un curso finalizado de React donde armé un
          <a href="https://mikes-mechs.netlify.app" target="_blank" rel="noopener">sitio de ecommerce</a>.</p>
        <p>He preparado task runners en Grunt y Gulp, aunque hoy en día prefiero Webpack.</p>

        <h3>GIT</h3>
        <p>
          Uso Bitbucket en lo laboral (por el ecosistema de Atlassian) y GitHub para lo personal.
          He usado GitLab anteriormente.
        </p>

        <h2>Tecnologías de este sitio</h2>
        <p>
          A finales del 2021 y aprovechando que aprendí React, rearmé todo el sitio usando <strong>NextJS</strong>,
          dejándolo alojado en <strong>Netlify</strong>.
          El contenido del blog existe en archivos <strong>Markdown</strong>, una idea que importé del
          formato anterior. Uso <strong>Tailwind</strong> como framework para los estilos
          sin usar plantillas de base (como bootstrap, etc).
        </p>
        <p>
          No tiene ningun tipo de backend ni base de datos, para mantenerlo simple.
        </p>
        <p>Previamente estaba hecho en <strong>Hugo</strong> (2018), pero nunca encontré intuitiva la
        estructura de las plantillas ni la sintaxis que usa. Sí me llevé la idea de crear contenido en archivos
        Markdown, hace que el contenido sea más portable.</p>

        <p>Anterior a eso tenía la web en <strong>Wordpress</strong>.</p>
      </div>
    </Layout>
  )
}

