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
      padding: theme.spacing.unit * 3,
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
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing.unit * 9,
      },
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })

interface WrapperProps extends WithStyles<typeof styles> {
  drawerOpen: boolean
  children: React.ReactNode
}

const Index: SFC<WrapperProps> = ({ classes, drawerOpen, children }) => {
  return (
    <main
      className={classNames(
        classes.content,
        drawerOpen && classes.ShiftContent,
        !drawerOpen && classes.drawerPaperClosed
      )}
    >
      <div className={classes.toolbar} />
      {children}
    </main>
  )
}

export default withStyles(styles)(Index)
