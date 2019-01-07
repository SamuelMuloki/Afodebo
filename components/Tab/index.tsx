import AppBar from "@material-ui/core/AppBar"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  WithTheme,
} from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Typography from "@material-ui/core/Typography"
import React from "react"
import SwipeableViews from "react-swipeable-views"

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  })

export interface FullWidthTabsProps
  extends WithStyles<typeof styles>,
    WithTheme {
  description: string
  specs: string
}

class FullWidthTabs extends React.Component<FullWidthTabsProps> {
  state = {
    value: 0,
  }

  handleChange = (_event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme, description, specs } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Description" />
            <Tab label="Specs" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>{description}</TabContainer>
          <TabContainer dir={theme.direction}>{specs}</TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs)
