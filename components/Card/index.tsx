import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
    cardSpacing: {
      margin: "14px",
    },
    cardDescription: {
      height: theme.spacing.unit * 9,
    },
    button: {
      margin: theme.spacing.unit,
    },
    cardButton: {
      justifyContent: "center",
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  })

export interface ProductDetails {
  _id: string
  name: string
  description: string
  sku: string
  saleprice: string
  slug: string
  image: [{ url: string }]
  brand: { name: string }
  category: { name: string }
}

export interface CardProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    products: Array<ProductDetails>
  }
}

const MediaCard = ({ classes, data }: CardProps, req) => {
  if (data.error) return "Error loading products"
  if (data.products && data.products.length) {
    return (
      <div className={classes.cardSpacing}>
        <Grid container spacing={8}>
          {data.products.map(images => (
            <Grid item sm={3} key={images._id} zeroMinWidth>
              <Link
                as={`/products/${images._id}`}
                href={`/products?id=${images._id}`}
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`http://localhost:1337${images.image[0].url}`}
                      title={images.name}
                    />
                    <CardContent>
                      <Typography component="p">
                        {images.brand && images.brand.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        className={classes.cardDescription}
                        variant="subtitle2"
                        component="h2"
                        noWrap
                      >
                        {images.slug}
                      </Typography>
                      <Typography component="p" color="error">{`UGX ${
                        images.saleprice
                      }`}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
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
      sku
      category {
        name
      }
      brand {
        name
      }
      slug
      saleprice
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
