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
  if (data.promotions && data.promotions.length) {
    return (
      <React.Fragment>
        <div className="promo-slider">
          <Slider {...settings}>
            {data.promotions
              .reduce<any[]>((imageArray, promo, currentIndex) => {
                if (promo.active) {
                  const promoImages = promo.image.map((promo, index) => {
                    return (
                      <img
                        height={300}
                        width={1500}
                        key={index}
                        alt={data.promotions[currentIndex].name}
                        src={`http://localhost:1337${promo.url}`}
                      />
                    )
                  })
                  imageArray.push(promoImages)
                }
                return imageArray
              }, [])
              .map(img => img)}
          </Slider>
        </div>
        <style jsx>
          {`
            .promo-slider {
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
        <div className="animated-background" />
        <style>
          {`
            @keyframes placeHolderShimmer {
              0% {
                background-position: -468px 0;
              }
              100% {
                background-position: 468px 0;
              }
            }
            .animated-background {
              animation-duration: 1s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderShimmer;
              animation-timing-function: linear;
              background: #f6f7f8;
              margin: 20px;
              background: linear-gradient(
                to right,
                #eeeeee 8%,
                #dddddd 18%,
                #eeeeee 33%
              );
              background-size: 1000px 104px;
              height: 180px;
              position: relative;
            }
            .card-gif-1 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 20%;
            }
            .card-gif-2 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 40%;
            }
            .card-gif-3 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 60%;
            }
            .card-gif-4 {
              background: #FFF;
              width: 20px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 80%;
            }
          `}
        </style>
      </>
    )
  }
  return <div />
}

const query = gql`
  {
    promotions {
      _id
      name
      active
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
