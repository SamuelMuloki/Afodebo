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
    categories {
      _id
      name
      image {
        url
      }
    }
  }
`

export interface CategoryProps extends WithStyles<typeof styles> {}

export interface QueryProps {
  data: {
    categories: Partial<Array<ProductDetails>>
  }
  loading: any
  error?: ApolloError
}

const Category = ({ classes }: CategoryProps) => (
  <Query query={GET_BRANDS}>
    {({ loading, error, data }: QueryProps) => {
      if (error) return "Error loading brands"
      if (data.categories && data.categories.length) {
        return (
          <React.Fragment>
            <div className="category-description">
              <Typography variant="h6" gutterBottom>
                {"Shop By Category"}
              </Typography>
            </div>
            <div className="category-slider">
              <Slider
                {...settings}
                slidesToShow={4}
                slidesToScroll={4}
                responsive={cardResponsive}
              >
                {data.categories.map((category, index) => (
                  <Card className={classes.card} key={index}>
                    <Link
                      as={`/${category.name}/${category._id}`}
                      href={`/search?id=${category._id}`}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={`http://localhost:1337${
                            category.image[0].url
                          }`}
                          title={category.name}
                        />
                      </CardActionArea>
                    </Link>
                  </Card>
                ))}
              </Slider>
            </div>
            <style jsx>
              {`
                .category-description {
                  margin-top: 40px;
                  margin-bottom: 40px;
                }
                .category-slider {
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

Category.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js")
  const json = await res.json()
  return { stars: json.stargazers_count, req }
}

export default withStyles(styles)(Category)
