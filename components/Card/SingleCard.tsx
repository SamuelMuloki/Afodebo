import { Button, Card } from "@material-ui/core"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Link from "next/link"
import React from "react"
import { removeSpaces } from "../Utils/data"
import { Container } from "../Utils/namespace"
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
  displayGrid?: boolean
}

const SingleCard = ({ classes, images }: ProductCardProps) => {
  return (
    <Card className={classes.card}>
      <Link
        as={`/${removeSpaces(images.name)}/${images._id}`}
        href={`/products?id=${images._id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={`http://localhost:1337${images.image[0].url}`}
            title={images.name}
          />
          <CardContent>
            <Typography variant="caption" noWrap>
              {`UGX ${images.saleprice}`}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" noWrap>
              {images.slug}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {`Sold by ${images.sellers.name}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button fullWidth size="large" color="primary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(SingleCard)
