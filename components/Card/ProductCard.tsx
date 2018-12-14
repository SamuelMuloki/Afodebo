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
import gql from "graphql-tag"
import Head from "next/head"
import Router from "next/router"
import React from "react"
import { Query } from "react-apollo"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

const GET_PRODUCT_ATTRIBUTES = gql`
  {
    categories {
      _id
      name
    }
    brands {
      _id
      name
    }
    colors {
      _id
      name
    }
  }
`

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
  filteredImages: {
    products: ProductDetails[]
  }
  checked: {
    [name: string]: boolean
  }
  filterDrawerOpen: boolean
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  private filteredItems: string[] = []
  readonly state: ProductCardState = {
    filteredImages: this.props.searchData,
    filterDrawerOpen: false,
    checked: {
      [this.props.searchData.name]: true,
    },
  }
  handleChange = value => event => {
    const index = this.filteredItems.indexOf(event.target.value)
    let refinement = ""
    if (index > -1) {
      this.filteredItems.splice(index, 1)
    } else {
      this.filteredItems.push(event.target.value)
    }
    this.filteredItems.forEach(f => {
      refinement = refinement + `${f}`
    })
    this.setState({
      checked: {
        [event.target.value]: event.target.checked,
      },
    })
    const href = `/search/?id=${value}`
    let as = `/search/${refinement}/${value}/`
    Router.push(href, `${as}`, { shallow: true })
  }
  render() {
    const { classes, searchData } = this.props
    const { filterDrawerOpen, filteredImages, checked } = this.state
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
        <Query query={GET_PRODUCT_ATTRIBUTES}>
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error!: ${error}`
            return Object.keys(data).map((value, index) => {
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
                    <FormControl>
                      <FormGroup>
                        {data[value].map(col => {
                          return (
                            <FormControlLabel
                              key={col._id}
                              control={
                                <Checkbox
                                  checked={
                                    checked ? checked[col.name] : undefined
                                  }
                                  className={classes.checkbox}
                                  value={col.name}
                                  onChange={this.handleChange(`${col._id}`)}
                                />
                              }
                              label={col.name}
                            />
                          )
                        })}
                      </FormGroup>
                    </FormControl>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }}
        </Query>
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
            {filteredImages.products.map(imgs => {
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
}

export default withStyles(styles)(ProductCard)
