import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import {
  AccountCircle,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  ShoppingCart,
} from "@material-ui/icons"
import { Container } from "next/app"
import Router from "next/router"
import * as React from "react"
import NavigationDrawer from "../Drawer"
import { unsetToken } from "../libs/auth"
import Wrapper from "../Wrapper"

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 500,
        "&:focus": {
          width: 550,
        },
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })

export interface PrimaryAppBarProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
  children: React.ReactNode
}

export interface PrimaryAppBarState {
  drawerOpen: boolean
  anchorEl: any
  mobileMoreAnchorEl: any
}

class PrimaryAppBar extends React.Component<
  PrimaryAppBarProps,
  PrimaryAppBarState
> {
  readonly state: PrimaryAppBarState = {
    drawerOpen: true,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  handleDrawerOpen = () => this.setState({ drawerOpen: !this.state.drawerOpen })
  handleDrawerClose = () => this.setState({ drawerOpen: false })

  render() {
    const { classes, isAuthenticated, loggedUser, children } = this.props
    const { anchorEl, mobileMoreAnchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const renderMenu =
      isAuthenticated && loggedUser ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>{loggedUser}</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={unsetToken}>LogOut</MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={() => Router.push("/signin")}>Sign In</MenuItem>
          <MenuItem onClick={() => Router.push("/signup")}>Sign Up</MenuItem>
        </Menu>
      )
    const renderMobleMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )
    return (
      <React.Fragment>
        <header>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                afodebo
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Try sneakers..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobleMenu}
          <NavigationDrawer
            drawerOpen={this.state.drawerOpen}
            onClose={this.handleDrawerClose}
          />
        </header>
        <Container>
          <Wrapper drawerOpen={this.state.drawerOpen} children={children} />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(PrimaryAppBar)
