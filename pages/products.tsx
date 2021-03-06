import {
  Avatar,
  Button,
  createStyles,
  Divider,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth"
import ShoppingBasket from "@material-ui/icons/AddShoppingCartOutlined"
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
import Tab from "../components/Tab"
import { addToCart, numberWithCommas } from "../components/Utils/data"
import { Container } from "../components/Utils/namespace"
import { MobileDrawer } from "../store/actions"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    cartProduct: {
      marginTop: theme.spacing.unit * 4,
    },
    Cartheading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    purpleAvatar: {
      color: "#fff",
      fontSize: "1em",
      background: "#232f3e",
    },
    cartSellerWrapper: {
      display: "flex",
    },
    cartSeller: {
      padding: theme.spacing.unit,
    },
    cartOriginalPrice: {
      textDecoration: "line-through",
      padding: theme.spacing.unit,
    },
    cartContent: {
      [theme.breakpoints.up("lg")]: {
        marginLeft: theme.spacing.unit * 12,
        marginRight: theme.spacing.unit * 12,
      },
    },
    cartButton: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  })

export interface ProductsProps extends WithStyles<typeof styles>, WithWidth {
  data: {
    loading: any
    error: string
    product: ProductDetails
  }
  context: any
  renderCategoryDrawer: (page?: string) => void
}

class Products extends React.Component<ProductsProps> {
  render() {
    const {
      data: { loading, error, product },
      context,
      // router,
      // isAuthenticated,
      classes,
      width,
    } = this.props
    if (error) return "Error loading Products"

    if (product) {
      const items = product.images.map(pdt => pdt.image).reduce(img => img)
      const images: Array<ReactImageGalleryItem> = items.map(itm => {
        return {
          original: itm.url,
          thumbnail: itm.url,
        }
      })
      return (
        <React.Fragment>
          <Head>
            <title>{` ${product.name} + FREE DELIVERY | afodebo.com`}</title>
          </Head>
          <div className={classes.cartContent}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={8} md={8} lg={6}>
                <ImageGallery
                  items={images}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  slideOnThumbnailHover={true}
                  showThumbnails={isWidthUp("lg", width) ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={4} lg={6} zeroMinWidth>
                <Typography variant="h6">{product.name}</Typography>
                <div className={classes.cartSellerWrapper}>
                  <Typography variant="h5" gutterBottom>
                    {`UGX ${numberWithCommas(product.saleprice)}`}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.cartOriginalPrice}
                  >
                    {product.originalprice
                      ? `UGX ${numberWithCommas(product.originalprice)}`
                      : ""}
                  </Typography>
                </div>
                <Typography variant="body1" color="textSecondary">
                  {product.originalprice
                    ? `Save UGX ${numberWithCommas(
                        product.originalprice - product.saleprice
                      )}`
                    : ""}
                </Typography>
                <Divider className={classes.cartButton} />
                <div className={classes.cartSellerWrapper}>
                  <Avatar className={classes.purpleAvatar}>
                    {product.sellers.name.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="body2"
                    className={classes.cartSeller}
                    noWrap
                  >
                    {`Sold by ${product.sellers.name}`}
                  </Typography>
                </div>
                <Divider className={classes.cartButton} />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.cartButton}
                  onClick={() =>
                    addToCart(
                      { _id: product._id, inventory: product.inventory },
                      context
                    )
                  }
                >
                  <ShoppingBasket className={classes.extendedIcon} />
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
            <div className={classes.cartProduct}>
              <Tab description={product.description} specs="specs" />
            </div>
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
    this.props.renderCategoryDrawer("products")
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
      inventory
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
  withWidth(),
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
