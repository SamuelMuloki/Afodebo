import {
  Checkbox,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import React from "react"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

const styles = () =>
  createStyles({
    expansionCard: {
      marginTop: "10px",
      boxShadow: "none",
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  images: {
    _id: string
    name: string
    products: ProductDetails[]
  }
}

export interface ProductCardState {
  filteredImages: {
    products: ProductDetails[]
  }
}

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  private filteredItems: string[] = []
  readonly state: ProductCardState = {
    filteredImages: this.props.images,
  }
  handleChange = event => {
    const index = this.filteredItems.indexOf(event.target.value)
    if (index > -1) {
      this.filteredItems.splice(index, 1)
    } else {
      this.filteredItems.push(event.target.value)
    }
    if (this.props.images) {
      if (this.filteredItems && this.filteredItems.length) {
        const img = this.filteredItems.map(filter => {
          return this.props.images.products.filter(
            pdt => filter === pdt.brand.name
          )
        })
        const filtered = img.reduce(
          (previousValue, currentValue) => previousValue.concat(currentValue),
          []
        )
        this.setState({ filteredImages: { products: [...filtered] } })
      } else {
        this.setState({ filteredImages: this.props.images })
      }
    }
  }
  render() {
    const { classes, images } = this.props
    const { filteredImages } = this.state
    return (
      <Grid container spacing={8}>
        <Grid item lg={3} md={3} sm={4} xs={12}>
          <List>
            <ListItem>
              <ListItemText primary="Narrow Choices" />
            </ListItem>
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
                <Typography variant="body1">Brands</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl>
                  <FormGroup>
                    {images.products.map(img => {
                      return (
                        <FormControlLabel
                          key={img._id}
                          control={
                            <Checkbox
                              value={img.brand.name}
                              onChange={this.handleChange}
                            />
                          }
                          label={img.brand.name}
                        />
                      )
                    })}
                  </FormGroup>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded className={classes.expansionCard}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Color</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>Black</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </List>
        </Grid>
        <Grid container item lg={9} md={9}>
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
    )
  }
}

export default withStyles(styles)(ProductCard)
