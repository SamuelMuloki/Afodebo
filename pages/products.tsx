import {
  Button,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import AddToCart from "@material-ui/icons/AddShoppingCart"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import gql from "graphql-tag"
import Head from "next/head"
import { withRouter } from "next/router"
import React from "react"
import { graphql } from "react-apollo"
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery"
import { connect } from "react-redux"
import { compose } from "recompose"
import { Dispatch } from "redux"
import { withContext } from "../components/Context/AppProvider"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"
import { MobileDrawer } from "../store/actions"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    cartProduct: {
      margin: theme.spacing.unit,
    },
    Cartheading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  })

export interface ProductsProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    product: ProductDetails
  }
  context: any
  renderCategoryDrawer: (page?: string) => void
}

class Products extends React.Component<ProductsProps> {
  addItem = (item: any) => {
    if (item) {
      this.props.context.addItem(item)
    }
  }

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
          <Head>
            <title>{` ${product.name} + FREE DELIVERY | afodebo.com`}</title>
          </Head>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography variant="h5" className={classes.cartProduct} noWrap>
                {product.name}
              </Typography>
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </Grid>
            <Hidden smDown>
              <Grid item lg={4} md={6} zeroMinWidth>
                <Typography variant="h6">About this Product</Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={6} md={6} lg={4} zeroMinWidth>
              <Typography variant="h5" noWrap gutterBottom>
                {`UGX ${product.saleprice}`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.addItem(product)}
              >
                <AddToCart className={classes.extendedIcon} />
                ADD TO CART
              </Button>
            </Grid>
          </Grid>
          <div className={classes.cartProduct}>
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
          </div>
        </React.Fragment>
      )
    } else if (loading) {
      return (
        <>
          <div className="animated-background">
            <div className="card-gif-1" />
            <div className="card-gif-2" />
          </div>
          <div className="animated-background-desc" />
          <style>
            {`
              @keyframes placeHolderShimmer {
              0% {
                background-position: -468px 0;
              }
              100% {
                background-position: 468px 0;
              }
            }
            .animated-background {
              animation-duration: 1s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background: #f6f7f8;
              margin: 20px;
              background: linear-gradient(
                to right,
                #eeeeee 8%,
                #dddddd 18%,
                #eeeeee 33%
              );
              background-size: 1000px 104px;
              height: 280px;
              position: relative;
            }
            .animated-background-desc {
              animation-duration: 1s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background: #f6f7f8;
              margin: 20px;
              background: linear-gradient(
                to right,
                #eeeeee 8%,
                #dddddd 18%,
                #eeeeee 33%
              );
              background-size: 1000px 104px;
              height: 80px;
              position: relative;
            }
            .card-gif-1 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 50%;
            }
            .card-gif-2 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 75%;
            }
            `}
          </style>
        </>
      )
    }
    return <h1>Loading</h1>
  }

  componentDidMount() {
    this.props.renderCategoryDrawer()
  }
}

const GET_IMAGE_GALLERY = gql`
  query($id: ID!) {
    product(id: $id) {
      _id
      name
      saleprice
      originalprice
      description
      sku
      sellers {
        name
      }
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

export const mapDispatchToProps = (dispatch: Dispatch<MobileDrawer>) => ({
  renderCategoryDrawer: (page: string) => dispatch(MobileDrawer(page)),
})

const enhancer = compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  withRouter,
  withStyles(styles),
  defaultPage,
  withContext,
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
)

export default enhancer(Products)
