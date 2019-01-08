import { Card } from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Router from "next/router"
import React from "react"
import { removeSpaces } from "../Utils/data"
import { Container } from "../Utils/namespace"
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
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
    },
    brandMedia: {
      height: "auto",
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  brand: Partial<ProductDetails>
}

const BrandCard = ({ classes, brand }: ProductCardProps) => {
  return (
    <Card
      className={classes.card}
      onClick={() =>
        Router.push(
          `/search?id=${brand._id}`,
          `/search/${removeSpaces(brand.name)}/${brand._id}`
        )
      }
    >
      <CardActionArea>
        <CardMedia
          className={classes.brandMedia}
          component="img"
          image={brand.image.url}
          title={brand.name}
        />
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(BrandCard)
