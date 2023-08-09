import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstat</link>ic.com' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600&display=swap' rel='stylesheet' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#6e7687' />
        <meta name='msapplication-TileColor' content='#6e7687' />
        <meta name='theme-color' content='#6e7687' />
        <meta name='description' content='My name is Mahdi Ebrahim Pour and this is my personal website. Welcome to my corner of the web!' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
