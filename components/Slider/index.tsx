import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core"
import gql from "graphql-tag"
import Link from "next/link"
import * as React from "react"
import { graphql } from "react-apollo"
import { default as Slider } from "react-slick"
import { compose } from "recompose"
import { settings } from "../Utils"
import { removeSpaces } from "../Utils/data"
import { Container } from "../Utils/namespace"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit,
    },
    promoSlider: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
      },
    },
    promoImage: {
      cursor: "pointer",
    },
  })

export interface ImageSliderProps extends WithStyles<typeof styles> {
  data: {
    loading: any
    error: string
    promotions: Array<ProductDetails>
  }
}

const ImageSlider = ({ data, classes }: ImageSliderProps) => {
  if (data.promotions && data.promotions.length) {
    return (
      <React.Fragment>
        <div className={classes.promoSlider}>
          <Slider {...settings}>
            {data.promotions
              .reduce<any[]>((imageArray, promo, currentIndex) => {
                if (promo.active) {
                  const promoImages = promo.image.map((promo, index) => {
                    return (
                      <Link
                        as={`/search/${removeSpaces(
                          data.promotions[currentIndex].name
                        )}/${data.promotions[currentIndex]._id}`}
                        href={`/search?id=${data.promotions[currentIndex]._id}`}
                      >
                        <img
                          className={classes.promoImage}
                          height={300}
                          width={1500}
                          key={index}
                          alt={data.promotions[currentIndex].name}
                          src={`http://localhost:1337${promo.url}`}
                        />
                      </Link>
                    )
                  })
                  imageArray.push(promoImages)
                }
                return imageArray
              }, [])
              .map(img => img)}
          </Slider>
        </div>
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

export default compose(
  withStyles(styles),
  graphql(query, {
    props: ({ data }) => ({
      data,
    }),
  })
)(ImageSlider as any)
