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
import Head from "next/head"
import React from "react"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    expansionCard: {
      boxShadow: "none",
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
    toolbar: theme.mixins.toolbar,
    description: {
      marginLeft: "20px",
    },
    category: {
      padding: "0px",
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  searchData: Partial<ProductDetails>
}

export interface ProductCardState {
  [name: string]: any
  filteredImages: Partial<ProductDetails>
  filterDrawerOpen: boolean
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  private filteredItems: string[] = []
  readonly state: ProductCardState = {
    filteredImages: this.props.searchData,
    filterDrawerOpen: false,
  }
  handleChange = category => event => {
    const index = this.filteredItems.indexOf(event.target.value)
    if (index > -1) {
      this.filteredItems.splice(index, 1)
    } else {
      this.filteredItems.push(event.target.value)
      console.log(category, event.target.value)
    }
  }
  render() {
    const { classes, searchData } = this.props
    const { filteredImages, filterDrawerOpen } = this.state
    const filterList = (
      <List>
        <Typography variant="h4" className={classes.description} gutterBottom>
          {searchData.category.name}
        </Typography>
        <Typography
          variant="body1"
          className={classes.description}
          gutterBottom
        >{`${searchData.category.products.length} items found`}</Typography>
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
        <ExpansionPanel defaultExpanded className={classes.expansionCard}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">Colors</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl>
              <FormGroup>
                {searchData.colors.map((col, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          value={col.name}
                          onChange={this.handleChange(col.name)}
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
      </List>
    )
    return (
      <>
        <Head>
          <title>{`${
            searchData.category.name
          } + FREE DELIVERY | afodebo.com`}</title>
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
              {"Filter"}
            </Button>
            <Drawer
              variant="temporary"
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
            {filteredImages.category.products.map(imgs => {
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
