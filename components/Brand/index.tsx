import { Typography } from "@material-ui/core"
import gql from "graphql-tag"
import React from "react"
import { graphql } from "react-apollo"
import { default as Slider } from "react-slick"
import { compose } from "recompose"
import { cardResponsive, settings } from "../Utils"
import { Container } from "../Utils/namespace"

type ProductDetails = Container.ProductDetails

export interface BrandProps {
  data: {
    loading: any
    error: string
    brands: Partial<Array<ProductDetails>>
  }
}

const Brand = ({ data }: BrandProps) => {
  if (data.error) return "Error loading brands"
  if (data.brands && data.brands.length) {
    return (
      <React.Fragment>
        <div className="brand-description">
          <Typography variant="h5" gutterBottom>
            {"Shop By Brand"}
          </Typography>
        </div>
        <div className="brand-slider">
          <Slider
            {...settings}
            slidesToShow={4}
            slidesToScroll={4}
            responsive={cardResponsive}
          >
            {data.brands.map((brand, index) => (
              <img
                key={index}
                alt={brand.name}
                src={`http://localhost:1337${brand.image.url}`}
              />
            ))}
          </Slider>
        </div>
        <style jsx>
          {`
            .brand-description {
              margin: 20px;
            }
            .brand-slider {
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
      <div className="animated-background">
        <div className="card-gif-1" />
        <div className="card-gif-2" />
        <div className="card-gif-3" />
        <div className="card-gif-4" />
      </div>
    )
  }
  return <div>{}</div>
}

const query = gql`
  {
    brands {
      _id
      name
      description
      products {
        _id
        name
      }
      image {
        url
      }
    }
  }
`
Brand.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js")
  const json = await res.json()
  return { stars: json.stargazers_count, req }
}

export default compose(
  graphql(query, {
    props: ({ data }) => ({
      data,
    }),
  })
)(Brand as any)