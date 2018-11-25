import { CircularProgress, Grid, Paper } from "@material-ui/core"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { graphql } from "react-apollo"
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery"
import { compose } from "recompose"
import { ProductDetails } from "../components/Card"
import defaultPage from "../components/hocs/defaultPage"

export interface ProductsProps {
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
            <Grid item xs={6}>
              <Paper elevation={1}>
                <ImageGallery items={images} />
              </Paper>
            </Grid>
          </Grid>
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
