import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstat</link>ic.com' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600&display=swap' rel='stylesheet' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
