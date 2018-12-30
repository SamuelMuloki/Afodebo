import { Avatar, Card } from "@material-ui/core"
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
import { numberWithCommas, removeSpaces } from "../Utils/data"
import { Container } from "../Utils/namespace"
type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
      margin: theme.spacing.unit,
      background: theme.palette.background.paper,
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
    purpleAvatar: {
      color: "#fff",
      fontSize: "1em",
      background: "#232f3e",
    },
    productWrapper: {
      display: "flex",
    },
    productSeller: {
      padding: theme.spacing.unit,
    },
  })

interface ProductCardProps extends WithStyles<typeof styles> {
  images: Partial<ProductDetails>
  displayGrid?: boolean
  context: any
}

const SingleCard = ({ classes, images }: ProductCardProps) => {
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
          <Typography variant="body1" noWrap>
            {`UGX ${numberWithCommas(images.saleprice)}`}
          </Typography>
          <Typography variant="body2" noWrap>
            {images.brand.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {images.slug}
          </Typography>
          <div className={classes.productWrapper}>
            <Avatar className={classes.purpleAvatar}>
              {images.sellers.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.productSeller}
              noWrap
            >
              {`Sold by ${images.sellers.name}`}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default compose<{}, any>(withStyles(styles))(SingleCard as any)
