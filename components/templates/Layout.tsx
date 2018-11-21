import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Head from "next/head"
import * as React from "react"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
  })

interface IProps extends WithStyles<typeof styles> {
  children: React.ReactNode
}

const LayoutComponent = (props: IProps) => {
  const { classes, children } = props
  return (
    <section className={classes.root}>
      <Head>
        <title>{"Afodebo"}</title>
      </Head>
      <article>{children}</article>
    </section>
  )
}

export const Layout = withStyles(styles)(LayoutComponent)
