import {
  Button,
  Checkbox,
  createStyles,
  Drawer,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  List,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import FilterIcon from "@material-ui/icons/FilterListSharp"
import Head from "next/head"
import React from "react"
import { getOccurrence } from "../Utils/data"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    expansionCard: {
      boxShadow: theme.shadows[0],
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: "0px",
    },
    productGrid: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing.unit * 20,
      },
    },
    drawerPaper: {
      width: "240px",
      flexShrink: 0,
    },
    description: {
      marginLeft: "20px",
    },
    category: {
      padding: theme.spacing.unit,
    },
    checkbox: {
      padding: "0 12px",
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  searchData: {
    _id: string
    name: string
    products: ProductDetails[]
  }
}

export interface ProductCardState {
  checkedItems: Map<string, boolean>
  filteredData: {
    products: ProductDetails[]
  }
  filterDrawerOpen: boolean
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  private unfilteredData: string[] = []
  readonly state: ProductCardState = {
    filteredData: this.props.searchData,
    filterDrawerOpen: false,
    checkedItems: new Map([[this.props.searchData.name, true]]),
  }
  handleChange = event => {
    const checkedValue = event.target.value
    const isChecked = event.target.checked
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(checkedValue, isChecked),
      }),
      () => this.renderFilteredData()
    )
  }

  render() {
    const { classes, searchData } = this.props
    const { filteredData, filterDrawerOpen } = this.state
    const filterList = (
      <List>
        <Typography variant="h4" className={classes.description} gutterBottom>
          {searchData.name}
        </Typography>
        <Typography
          variant="body1"
          className={classes.description}
          gutterBottom
        >{`${searchData.products.length} items found`}</Typography>
        <Typography variant="h6" className={classes.description} gutterBottom>
          Narrow Choices
        </Typography>
        <ExpansionPanel defaultExpanded className={classes.expansionCard}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">Gender</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>Men</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {["brand", "colors", "sellers"].map((value, index) => {
          this.unfilteredData = searchData.products.map(img => {
            if (Array.isArray(img[value])) {
              return img[value].map(val => val.name).reduce(val => val)
            } else {
              return img[value].name
            }
          })
          return (
            <ExpansionPanel
              key={index}
              defaultExpanded
              className={classes.expansionCard}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">{value}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl component="fieldset">
                  <FormGroup>
                    {this.unfilteredData
                      .filter(
                        (val, index, array) => array.indexOf(val) === index
                      )
                      .map((col, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={this.state.checkedItems.get(col)}
                                value={col}
                                onChange={this.handleChange}
                                className={classes.checkbox}
                              />
                            }
                            label={`${col} (${getOccurrence(
                              this.unfilteredData,
                              col
                            )})`}
                          />
                        )
                      })}
                  </FormGroup>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </List>
    )
    return (
      <>
        <Head>
          <title>{`${searchData.name} + FREE DELIVERY | afodebo.com`}</title>
        </Head>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            open
          >
            <div className={classes.toolbar} />
            {filterList}
          </Drawer>
        </Hidden>
        <Grid container spacing={8}>
          <Hidden mdUp>
            <Button onClick={() => this.setState({ filterDrawerOpen: true })}>
              <FilterIcon className={classes.extendedIcon} />
              {"Filter"}
            </Button>
            <Drawer
              variant="temporary"
              classes={{ paper: classes.drawerPaper }}
              open={filterDrawerOpen}
              onClose={() => this.setState({ filterDrawerOpen: false })}
            >
              {filterList}
            </Drawer>
          </Hidden>
          <Grid
            container
            item
            lg={9}
            md={9}
            sm={12}
            className={classes.productGrid}
          >
            {filteredData.products.map(imgs => {
              return (
                <Grid
                  key={imgs._id}
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  zeroMinWidth
                >
                  <SingleCard images={imgs} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </>
    )
  }

  private renderFilteredData = () => {
    let reducedData = []
    this.state.checkedItems.forEach((value, key) => {
      if (value === true) {
        const filters = ["brand", "colors", "sellers"]
          .map(cat => {
            return this.props.searchData.products.filter(pdt => {
              if (Array.isArray(pdt[cat])) {
                return pdt[cat][0].name === key
              } else {
                return pdt[cat].name === key
              }
            })
          })
          .reduce<ProductDetails[][]>((prev, curr) => {
            return prev.concat(curr)
          }, [])
        reducedData.push(filters)
      }
    })
    const stateData = reducedData
      .reduce<ProductDetails[]>((acc, curr) => {
        return acc.concat(curr)
      }, [])
      .filter((val, index, array) => array.indexOf(val) === index)
    this.setState({
      filteredData: {
        products: stateData.length ? stateData : this.props.searchData.products,
      },
    })
  }
}

export default withStyles(styles)(ProductCard)
