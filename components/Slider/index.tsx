import gql from "graphql-tag"
import * as React from "react"
import { graphql } from "react-apollo"
import { default as Slider } from "react-slick"
import { compose } from "recompose"
import { settings } from "../Utils"
import { Container } from "../Utils/namespace"

type ProductDetails = Container.ProductDetails

export interface ImageSliderProps {
  data: {
    loading: any
    error: string
    promotions: Array<ProductDetails>
  }
}

const ImageSlider = ({ data }: ImageSliderProps) => {
  if (data.promotions) {
    return (
      <React.Fragment>
        <div className="promo-slider">
          <Slider {...settings}>
            {data.promotions[0].image.map((promo, index) => {
              return (
                <img
                  height={300}
                  width={1500}
                  key={index}
                  alt={data.promotions[0].name}
                  src={`http://localhost:1337${promo.url}`}
                />
              )
            })}
          </Slider>
        </div>
        <style jsx>
          {`
            .promo-slider {
              margin-bottom: 30px;
              margin-left: 30px;
              margin-right: 30px;
            }
            .image-slider {
              margin: 10px;
            }
          `}
        </style>
      </React.Fragment>
    )
  }
  return <div />
}

const query = gql`
  {
    promotions {
      _id
      name
      image {
        url
      }
    }
  }
`
ImageSlider.getInitialProps = async ({ req }) => {
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
)(ImageSlider as any)
