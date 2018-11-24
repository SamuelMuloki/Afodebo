import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import { Container } from "next/app"
import Head from "next/head"
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
    const { classes, children } = this.props
    return (
      <div className={classes.root}>
        <Head>
          <title>{"Afodebo"}</title>
        </Head>
        <header>
          {/* <Paper className={classes.mainContainer}>
            <Typography variant="h5">Hello Next.js 👋</Typography>
            {isAuthenticated && loggedUser ? (
              <>
                <span style={{ color: "black", marginRight: 30 }}>
                  {loggedUser}
                </span>
                <Button variant="contained" className={classes.button}>
                  <Link href="/">
                    <a className={classes.navLink} onClick={unsetToken}>
                      Logout
                    </a>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" className={classes.button}>
                  <Link href="/signin">
                    <a className={classes.navLink}>Sign In</a>
                  </Link>
                </Button>
                <Button variant="contained" className={classes.button}>
                  <Link href="/signup">
                    <a className={classes.navLink}>Sign Up</a>
                  </Link>
                </Button>
              </>
            )}
          </Paper> */}
          <AppBar isAuthenticated loggedUser={this.props.loggedUser} />
        </header>
        <Container>{children}</Container>
      </div>
    )
  }
}

export default compose(
  defaultPage,
  withStyles(styles)
)(LayoutComponent)
