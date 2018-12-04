import { Typography } from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import React from "react"
import { Query } from "react-apollo"
import { default as Slider } from "react-slick"
import { cardResponsive, settings } from "../Utils"
import { Container } from "../Utils/namespace"

type ProductDetails = Container.ProductDetails

const GET_BRANDS = gql`
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

export interface BrandProps {
  data: {
    brands: Partial<Array<ProductDetails>>
  }
  loading: any
  error?: ApolloError
}

const Brand = () => (
  <Query query={GET_BRANDS}>
    {({ loading, error, data }: BrandProps) => {
      if (error) return "Error loading brands"
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
      } else if (loading) {
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
    }}
  </Query>
)

Brand.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js")
  const json = await res.json()
  return { stars: json.stargazers_count, req }
}

export default Brand
