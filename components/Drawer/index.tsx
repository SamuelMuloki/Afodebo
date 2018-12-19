import {
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth"
import MenuIcon from "@material-ui/icons/Menu"
import classNames from "classnames"
import * as React from "react"
import { compose } from "recompose"
import Menu from "../Menu"

export const drawerWidth = 240

const styles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      position: "fixed",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    mobileDrawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9,
      },
    },
  })
export interface DrawerProps extends WithStyles<typeof styles>, WithWidth {
  drawerOpen: boolean
  renderMobileDrawer: boolean
  onClose: () => void
}

class NavigationDrawer extends React.Component<DrawerProps> {
  render() {
    const {
      width,
      drawerOpen,
      classes,
      onClose,
      renderMobileDrawer,
    } = this.props
    if (isWidthUp("md", width) && !renderMobileDrawer) {
      return (
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !drawerOpen && classes.drawerPaperClose
            ),
          }}
          open
        >
          <div className={classes.toolbar} />
          <Menu />
        </Drawer>
      )
    } else {
      return (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={onClose}
          classes={{
            paper: classes.mobileDrawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <React.Fragment>
            <Toolbar>
              <IconButton color="default" onClick={onClose}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                afodebo
              </Typography>
            </Toolbar>
          </React.Fragment>
          <Divider />
          <Menu />
        </Drawer>
      )
    }
  }
}

const enhancer: any = compose(
  withWidth(),
  withStyles(styles)
)

export default enhancer(NavigationDrawer)
