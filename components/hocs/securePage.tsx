import React from "react"
import defaultPage from "./defaultPage"

export interface SecurePageProps {
  isAuthenticated: boolean
}

const securePageHoc = Page =>
  class SecurePage extends React.Component<SecurePageProps> {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx)
    }

    render() {
      const { isAuthenticated } = this.props
      return isAuthenticated ? <Page {...this.props} /> : "Not Authorized"
    }
  }

export default Page => defaultPage(securePageHoc(Page))
