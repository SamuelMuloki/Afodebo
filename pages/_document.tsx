import Document, { Head, Main, NextScript } from "next/document"
import React from "react"
import JssProvider from "react-jss/lib/JssProvider"
import flush from "styled-jsx/server"
import getPageContext from "../components/getPageContext"
interface IProps {
  pageContext: any
  pageProps: any
}

/**
 * @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
 */
class MyDocument extends Document<IProps> {
  static getInitialProps = ctx => {
    const pageContext = getPageContext()
    const page = ctx.renderPage(Component => props => (
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <Component pageProps={pageContext} {...props} />
      </JssProvider>
    ))

    const pageProps = ctx.store.getState()
    return {
      ...page,
      pageContext,
      pageProps,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString(),
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
    }
  }

  render() {
    const { pageContext } = this.props

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary[500]}
          />
          <meta name="description" content={"Online shop for shoes"} />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
