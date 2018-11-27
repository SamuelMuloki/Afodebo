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

export interface ProductDetails {
  _id: string
  name: string
  description: string
  sku: string
  saleprice: number
  originalprice: number
  slug: string
  image: [{ url: string }]
  brand: { name: string }
  category: { name: string }
  sellers: { name: string }
  images: Array<{ _id: string; image: [{ url: string }] }>
}

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
                    <Typography variant="subtitle1">{`UGX ${
                      images.saleprice
                    }`}</Typography>
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
