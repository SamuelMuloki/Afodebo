import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
// import Link from "next/link"
import * as React from "react"
import { compose } from "recompose"
import AppBar from "../AppBar"
import defaultPage from "../hocs/defaultPage"
// import { unsetToken } from "../libs/auth"

const styles = () =>
  createStyles({
    root: {
      height: "100%",
    },
  })

interface IProps extends WithStyles<typeof styles> {
  children: React.ReactNode
  loggedUser: string
  isAuthenticated: boolean
}

class LayoutComponent extends React.Component<IProps> {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ req, Component, ctx, isAuthenticated }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, isAuthenticated, req }
  }

  render() {
    const { classes, children, isAuthenticated } = this.props
    return (
      <div className={classes.root}>
        <AppBar
          isAuthenticated={isAuthenticated}
          loggedUser={this.props.loggedUser}
          children={children}
        />
      </div>
    )
  }
}

export default compose(
  defaultPage,
  withStyles(styles)
)(LayoutComponent)
