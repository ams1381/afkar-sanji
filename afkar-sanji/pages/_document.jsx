import AuthContextProvider from '@/utilities/AuthContext';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import React, { Component } from 'react'
import { styled } from 'styled-components';
import { ServerStyleSheet } from 'styled-components';


export default class MyDocument extends Component {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const renderPage = ctx.renderPage;
    try {
        ctx.renderPage = () => renderPage({
            enhanceApp: App => props => sheet.collectStyles(<App { ...props } />)
        })
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            )
        }
    }
    finally {
        sheet.seal();
    }
}
  render() {
    return (
      <Html lang="en">
      <Head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
          <link rel="icon" href="/logo-maah.png" />
        <link
        rel="stylesheet"
        href="https://video-react.github.io/assets/video-react.css"
      />
      </Head>
      <body>
      {/* <AuthContextProvider> */}
          <Main />
          <NextScript />
          {/* </AuthContextProvider> */}
      </body>
    </Html>
    )
  }
}
