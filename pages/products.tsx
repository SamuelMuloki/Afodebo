import { Grid, Paper } from "@material-ui/core"
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
    products: Array<ProductDetails>
  }
}

class Products extends React.Component<ProductsProps> {
  render() {
    const {
      data: { loading, error, products },
      // router,
      // isAuthenticated,
    } = this.props
    if (error) return "Error loading Products"

    if (products) {
      const items = products.map(pdt => pdt.image).reduce(img => img)
      const images: Array<ReactImageGalleryItem> = items.map(itm => {
        return {
          original: itm.url,
          thumbnail: itm.url,
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
    }
    return <h1>Loading</h1>
  }
}

const GET_IMAGE_GALLERY = gql`
  query($id: ID!) {
    product(id: $id) {
      _id
      name
      image {
        url
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
