import { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

const Document = (): ReactElement => (
  <Html>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
