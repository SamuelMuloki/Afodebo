import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import MenuIcon from "@material-ui/icons/Menu"
import classNames from "classnames"
import * as React from "react"
import Menu from "../Menu"

export const drawerWidth = 240

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      paddingTop: "65px",
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
export interface DrawerProps extends WithStyles<typeof styles> {
  drawerOpen: boolean
  onClose: () => void
}

const NavigationDrawer = withStyles(styles)(
  ({ drawerOpen, onClose, classes }: DrawerProps) => {
    return (
      <React.Fragment>
        <Hidden smDown implementation="css">
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
            <Menu />
          </Drawer>
        </Hidden>
        <Hidden mdUp>
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
        </Hidden>
      </React.Fragment>
    )
  }
)

export default NavigationDrawer
