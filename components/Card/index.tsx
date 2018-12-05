import { Typography } from "@material-ui/core"
import { createStyles, Theme } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import gql from "graphql-tag"
import React from "react"
import { graphql } from "react-apollo"
import { default as Slider } from "react-slick"
import { compose } from "recompose"
import { cardResponsive, settings } from "../Utils"
// import { discount } from "../Utils/data"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"
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
        <div className="card-description">
          <Typography variant="h6" gutterBottom>
            {"On Sale"}
          </Typography>
        </div>
        <div className="card-slider">
          <Slider
            {...settings}
            slidesToShow={4}
            slidesToScroll={4}
            responsive={cardResponsive}
          >
            {data.products.map(images => {
              if (images.sale) {
                return <SingleCard key={images._id} images={images} />
              }
            })}
          </Slider>
        </div>
        <style jsx>
          {`
            .card-description {
              margin-top: 40px;
              margin-bottom: 40px;
            }
            .card-slider {
              margin-bottom: 20px;
              margin-left: 20px;
              margin-right: 20px;
            }
          `}
        </style>
      </React.Fragment>
    )
  } else if (data.loading) {
    return (
      <>
        <div className="animated-background">
          <div className="card-gif-1" />
          <div className="card-gif-2" />
          <div className="card-gif-3" />
          <div className="card-gif-4" />
        </div>
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
      sale
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
