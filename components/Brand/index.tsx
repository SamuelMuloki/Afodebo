import {
  Card,
  CardActionArea,
  CardMedia,
  createStyles,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import Link from "next/link"
import React from "react"
import { Query } from "react-apollo"
import { default as Slider } from "react-slick"
import { cardResponsive, settings } from "../Utils"
import { Container } from "../Utils/namespace"

type ProductDetails = Container.ProductDetails

const styles = () =>
  createStyles({
    card: {
      boxShadow: "none",
    },
  })

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

export interface BrandProps extends WithStyles<typeof styles> {}

export interface QueryProps {
  data: {
    brands: Partial<Array<ProductDetails>>
  }
  loading: any
  error?: ApolloError
}

const Brand = ({ classes }: BrandProps) => (
  <Query query={GET_BRANDS}>
    {({ loading, error, data }: QueryProps) => {
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
                  <Card className={classes.card} key={index}>
                    <Link
                      as={`/search/${brand._id}`}
                      href={`/search?id=${brand._id}`}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={`http://localhost:1337${brand.image.url}`}
                          title={brand.name}
                        />
                      </CardActionArea>
                    </Link>
                  </Card>
                ))}
              </Slider>
            </div>
            <style jsx>
              {`
                .brand-description {
                  margin-top: 40px;
                  margin-bottom: 40px;
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

export default withStyles(styles)(Brand)
