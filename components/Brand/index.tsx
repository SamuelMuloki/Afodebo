import {
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import React from "react"
import { Query } from "react-apollo"
import { default as Slider } from "react-slick"
import { cardResponsive, settings } from "../Utils"
import { Container } from "../Utils/namespace"
import BrandCard from "./BrandCard"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
    },
    brandSlider: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
      },
    },
    brandDesc: {
      padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 4,
    },
    brandMedia: {
      height: "auto",
    },
    cardHeading: {
      fontWeight: 700,
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
            <div className={classes.brandDesc}>
              <Typography
                className={classes.cardHeading}
                variant="h5"
                gutterBottom
              >
                {"Trending Brands"}
              </Typography>
            </div>
            <div className={classes.brandSlider}>
              <Slider
                {...settings}
                autoplay={false}
                slidesToShow={5}
                slidesToScroll={5}
                responsive={cardResponsive}
              >
                {data.brands.map((brand, index) => (
                  <BrandCard key={index} brand={brand} />
                ))}
              </Slider>
            </div>
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

export default withStyles(styles)(Brand)
