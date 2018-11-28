import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import gql from "graphql-tag"
import Link from "next/link"
import React from "react"
import { graphql } from "react-apollo"
import { compose } from "recompose"
import { Container } from "../Utils/namespace"
type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
    },
    button: {
      margin: theme.spacing.unit,
    },
    cardButton: {
      justifyContent: "center",
    },
    originalPrice: {
      textDecoration: "line-through",
    },
  })

export interface CardProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    products: Array<ProductDetails>
  }
}

const MediaCard = ({ classes, data }: CardProps) => {
  if (data.error) return "Error loading products"
  if (data.products && data.products.length) {
    return (
      <Grid container spacing={8}>
        {data.products.map(images => (
          <Grid item sm={3} key={images._id} zeroMinWidth>
            <Card className={classes.card}>
              <Link
                as={`/products/${images._id}`}
                href={`/products?id=${images._id}`}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`http://localhost:1337${images.image[0].url}`}
                    title={images.name}
                  />
                  <CardContent>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography variant="caption">
                          {`UGX ${images.saleprice}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          className={classes.originalPrice}
                        >
                          {images.originalprice
                            ? `UGX ${images.originalprice}`
                            : ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="caption" color="secondary">
                          {images.originalprice
                            ? `(${Math.round(
                                100 -
                                  (images.saleprice / images.originalprice) *
                                    100
                              )}% off)`
                            : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      noWrap
                    >
                      {images.slug}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {`Sold by ${images.sellers.name}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Button fullWidth size="large" color="primary">
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  } else if (data.loading) {
    return <CircularProgress />
  }
  return <h1>Loading</h1>
}

const query = gql`
  {
    products {
      _id
      name
      description
      sku
      category {
        name
      }
      brand {
        name
      }
      sellers {
        _id
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
