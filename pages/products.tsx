import {
  Button,
  CircularProgress,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { graphql } from "react-apollo"
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery"
import { compose } from "recompose"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    cartItems: {
      margin: theme.spacing.unit * 2,
    },
    cartButtons: {
      margin: theme.spacing.unit,
    },
    cartProduct: {
      marginBottom: theme.spacing.unit * 2,
    },
    Cartheading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })

export interface ProductsProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    product: ProductDetails
  }
}

class Products extends React.Component<ProductsProps> {
  render() {
    const {
      data: { loading, error, product },
      // router,
      // isAuthenticated,
      classes,
    } = this.props
    if (error) return "Error loading Products"

    if (product) {
      const items = product.images.map(pdt => pdt.image).reduce(img => img)
      const images: Array<ReactImageGalleryItem> = items.map(itm => {
        return {
          original: `http://localhost:1337${itm.url}`,
          thumbnail: `http://localhost:1337${itm.url}`,
        }
      })
      return (
        <React.Fragment>
          <Grid container spacing={24}>
            <Grid item sm={6}>
              <Typography variant="h5" className={classes.cartProduct} noWrap>
                {product.name}
              </Typography>
              <ImageGallery items={images} />
            </Grid>
            <Grid item sm={6} zeroMinWidth>
              <Paper>
                <div className={classes.cartItems}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {`UGX ${product.saleprice}`}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.cartButtons}
                  >
                    ADD TO CART
                  </Button>
                  <Button variant="contained" color="primary">
                    BUY NOW
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.cartItems}>
            <Grid container spacing={24}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.Cartheading}>
                    About this Product
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {product.description}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </div>
        </React.Fragment>
      )
    } else if (loading) {
      return <CircularProgress />
    }
    return <h1>Loading</h1>
  }
}

const GET_IMAGE_GALLERY = gql`
  query($id: ID!) {
    product(id: $id) {
      _id
      name
      saleprice
      description
      images {
        _id
        name
        image {
          url
        }
      }
    }
  }
`

export default compose(
  withRouter,
  withStyles(styles),
  defaultPage,
  graphql(GET_IMAGE_GALLERY, {
    options: (props: { router: { query: { id: string } } }) => {
      return {
        variables: {
          id: props.router.query.id,
        },
      }
    },
    props: ({ data }) => ({ data }),
  })
)(Products)
