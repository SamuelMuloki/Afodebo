import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core"
import CreditCard from "@material-ui/icons/CreditCard"
import Home from "@material-ui/icons/Home"
import ImportExport from "@material-ui/icons/ImportExport"
import LocalShipping from "@material-ui/icons/LocalShipping"
import SendIcon from "@material-ui/icons/Send"
import Settings from "@material-ui/icons/Settings"
import Shop from "@material-ui/icons/Shop"
import Timer from "@material-ui/icons/Timer"
import Toys from "@material-ui/icons/Toys"
import * as React from "react"

const Menu = () => {
  return (
    <List>
      <Tooltip id="tooltip-left" title="Home" placement="bottom-end">
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText inset primary="Home" />
        </ListItem>
      </Tooltip>
      <Tooltip id="tooltip-left" title="Deals" placement="bottom-end">
        <ListItem button component="a" href="/category">
          <ListItemIcon>
            <Timer />
          </ListItemIcon>
          <ListItemText inset primary="Deals" />
        </ListItem>
      </Tooltip>
      <Tooltip id="tooltip-left" title="Import" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <ImportExport />
          </ListItemIcon>
          <ListItemText inset primary="Import" />
        </ListItem>
      </Tooltip>
      <Tooltip id="tooltip-left" title="Export" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Export" />
        </ListItem>
      </Tooltip>
      <Tooltip id="tooltip-left" title="Shop" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <Shop />
          </ListItemIcon>
          <ListItemText inset primary="Shop" />
        </ListItem>
      </Tooltip>
      <Tooltip id="Toys" title="Toys" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <Toys />
          </ListItemIcon>
          <ListItemText inset primary="Kids Toys" />
        </ListItem>
      </Tooltip>
      <Divider />
      <Tooltip id="tooltip-left" title="Payments" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText inset primary="Payments" />
        </ListItem>
      </Tooltip>
      <Tooltip id="LocalShipping" title="Local Shipping" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText inset primary="Local Shipping" />
        </ListItem>
      </Tooltip>
      <Tooltip id="Settings" title="Settings" placement="bottom-end">
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </ListItem>
      </Tooltip>
    </List>
  )
}

export default Menu
