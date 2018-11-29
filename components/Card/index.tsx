import { CircularProgress, Grid, Hidden } from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import gql from "graphql-tag"
import React from "react"
import { graphql } from "react-apollo"
import { compose } from "recompose"
// import { discount } from "../Utils/data"
import { Container } from "../Utils/namespace"
import ProductCard from "./ProductCard"
type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit,
    },
  })

export interface CardProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    products: Array<ProductDetails>
  }
}

const MediaCard = ({ data }: CardProps) => {
  if (data.error) return "Error loading products"
  if (data.products && data.products.length) {
    return (
      <React.Fragment>
        {/* TODO: Display Products on sale by category */}
        <Grid container spacing={8} direction="row" justify="space-evenly">
          {data.products.map(images => {
            return <ProductCard key={images._id} images={images} />
          })}
        </Grid>
      </React.Fragment>
    )
  } else if (data.loading) {
    return (
      <>
        <Hidden smDown implementation="css">
          <div className="animated-background" />
          <div className="animated-background">
            <div className="card-gif-1" />
            <div className="card-gif-2" />
            <div className="card-gif-3" />
            <div className="card-gif-4" />
          </div>
          <div className="animated-background">
            <div className="card-gif-1" />
            <div className="card-gif-2" />
            <div className="card-gif-3" />
            <div className="card-gif-4" />
          </div>
        </Hidden>
        <Hidden mdUp>
          <CircularProgress />
        </Hidden>
      </>
    )
  }
  return <h1>Loading</h1>
}

const query = gql`
  {
    products {
      _id
      name
      description
      category {
        name
      }
      brand {
        name
      }
      sellers {
        name
      }
      slug
      saleprice
      originalprice
      image {
        url
      }
    }
  }
`
MediaCard.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js")
  const json = await res.json()
  return { stars: json.stargazers_count, req }
}

export default compose(
  withStyles(styles),
  graphql(query, {
    props: ({ data }) => ({
      data,
    }),
  })
)(MediaCard as any)
