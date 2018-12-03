import { Grid } from "@material-ui/core"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import React from "react"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
    },
    button: {
      margin: theme.spacing.unit,
    },
    originalPrice: {
      textDecoration: "line-through",
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  images: ProductDetails
}

const ProductCard = ({ classes, images }: ProductCardProps) => {
  return (
    <Grid container spacing={8} direction="row" justify="space-evenly">
      <Grid
        container
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}
        key={images._id}
        zeroMinWidth
      >
        <SingleCard classes={classes} images={images} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ProductCard)
