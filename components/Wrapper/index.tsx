import { Hidden } from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import classNames from "classnames"
import { SFC } from "react"
import { drawerWidth } from "../Drawer"

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit,
    },
    ShiftContent: {
      [theme.breakpoints.up("md")]: {
        marginLeft: drawerWidth,
      },
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClosed: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })

interface WrapperProps extends WithStyles<typeof styles> {
  drawerOpen: boolean
  children: React.ReactNode
  renderMobileDrawer: boolean
}

const Index: SFC<WrapperProps> = ({
  classes,
  drawerOpen,
  children,
  renderMobileDrawer,
}) => {
  return (
    <>
      <Hidden smDown implementation="css">
        <main
          className={classNames(
            classes.content,
            drawerOpen && !renderMobileDrawer && classes.ShiftContent,
            !drawerOpen && !renderMobileDrawer && classes.drawerPaperClosed
          )}
        >
          <div className={classes.toolbar} />
          {children}
        </main>
      </Hidden>
      <Hidden mdUp>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </Hidden>
    </>
  )
}

export default withStyles(styles)(Index)
