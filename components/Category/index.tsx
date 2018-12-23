import {
  Card,
  CardActionArea,
  CardMedia,
  createStyles,
  Theme,
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

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
    },
    categorySlider: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
      },
    },
    categoryDesc: {
      padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 4,
    },
    categoryMedia: {
      height: "auto",
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
            <div className={classes.categoryDesc}>
              <Typography variant="h5" gutterBottom>
                {"Shop By Category"}
              </Typography>
            </div>
            <div className={classes.categorySlider}>
              <Slider
                {...settings}
                slidesToShow={4}
                slidesToScroll={4}
                infinite={false}
                autoplay={false}
                responsive={cardResponsive}
              >
                {data.categories.map((category, index) => (
                  <div key={index} className="category-card-slide">
                    <Card className={classes.card}>
                      <Link
                        as={`/search/${category.name}/${category._id}`}
                        href={`/search?id=${category._id}`}
                      >
                        <CardActionArea>
                          <CardMedia
                            className={classes.categoryMedia}
                            component="img"
                            image={`http://localhost:1337${
                              category.image[0].url
                            }`}
                            title={category.name}
                          />
                        </CardActionArea>
                      </Link>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
            <style jsx>
              {`
                .category-description {
                  margin-top: 40px;
                  margin-bottom: 40px;
                }
                .category-card-slide {
                  margin: 10px;
                  width: auto !important;
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
