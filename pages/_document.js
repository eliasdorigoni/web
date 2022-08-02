import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#D1382E" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="robots" content="index, follow" />
        <link key="font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,600|Source+Sans+Pro:300,400,600,700" />
        <link key="prism" type="text/css" href="https://unpkg.com/prismjs@1.25.0/themes/prism.css" rel="stylesheet" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-39351861-1"></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-39351861-1', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <Script src="https://unpkg.com/prismjs@1.25.0/components/prism-core.min.js"></Script>
        <Script src="https://unpkg.com/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js"></Script>
        <NextScript />
      </body>
    </Html>
  )
}
