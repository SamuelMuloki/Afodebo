import { Card } from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Router from "next/router"
import React from "react"
import { removeSpaces } from "../Utils/data"
import { Container } from "../Utils/namespace"
type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
      margin: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
    originalPrice: {
      textDecoration: "line-through",
    },
    cardMedia: {
      height: "auto",
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  images: Partial<ProductDetails>
  displayGrid?: boolean
}

const SingleCard = ({ classes, images }: ProductCardProps) => {
  return (
    <Card
      className={classes.card}
      onClick={() =>
        Router.push(
          `/products?id=${images._id}`,
          `/${removeSpaces(images.name)}/${images._id}`
        )
      }
    >
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={`http://localhost:1337${images.image.url}`}
          title={images.name}
        />
        <CardContent>
          <Typography variant="caption" noWrap>
            {`UGX ${images.saleprice}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {images.slug}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {`Sold by ${images.sellers.name}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(SingleCard)
