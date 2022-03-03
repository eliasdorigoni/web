import { useRouter } from 'next/router'
import Script from 'next/script'

export default function Comments({url, identifier}) {
    const router = useRouter()
    return (
        <section>
            <div id="disqus_thread"></div>
            <Script dangerouslySetInnerHTML={{
                __html: `
                (function() {
                    if (window.location.hostname == "localhost") {
                        return;
                    }

                    var disqus_config = function () {
                        this.page.url = "` + url + `";
                        this.page.identifier = "` + identifier + `";
                    };

                    (function() { // DON'T EDIT BELOW THIS LINE
                    var d = document, s = d.createElement('script');
                    s.src = 'https://eliasdorigoni.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                    })();
                })();`}}>
            </Script>

            <noscript>Para ver los comentarios es necesario activar JavaScript.</noscript>
            <a href="http://disqus.com/" className="dsq-brlink" rel="noopener" target="_blank">Comentarios por <span className="logo-disqus">Disqus</span></a>
        </section>
    )
}
