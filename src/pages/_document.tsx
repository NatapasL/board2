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
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
