import { Button, Card, CardActions } from "@material-ui/core"
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
import { compose } from "recompose"
import { withContext } from "../Context/AppProvider"
import { numberWithCommas, removeSpaces } from "../Utils/data"
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
  context: any
}

const SingleCard = ({ classes, images, context }: ProductCardProps) => {
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() =>
          Router.push(
            `/products?id=${images._id}`,
            `/${removeSpaces(images.name)}/${images._id}`
          )
        }
      >
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={`http://localhost:1337${images.image.url}`}
          title={images.name}
        />
        <CardContent>
          <Typography variant="caption" noWrap>
            {`UGX ${numberWithCommas(images.saleprice)}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {images.slug}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {`Sold by ${images.sellers.name}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          fullWidth
          variant="text"
          color="primary"
          onClick={() => context.addItem(images)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default compose(
  withStyles(styles),
  withContext
)(SingleCard as any)
