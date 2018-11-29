// import Link from "next/link"
import gql from "graphql-tag"
import React from "react"
import { graphql } from "react-apollo"
import { default as Slider } from "react-slick"
import { compose } from "recompose"
import { settings } from "../Utils"
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
        <div className="brand-slider">
          <Slider {...settings} slidesToShow={4} slidesToScroll={4}>
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
            .brand-slider {
              margin-bottom: 40px;
              margin-left: 30px;
              margin-right: 30px;
              margin-top: 40px;
            }
          `}
        </style>
      </React.Fragment>
    )
  } else if (data.loading) {
    // return <CircularProgress />
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
