import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React from "react"

const styles = () =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })

interface MediaCardProps extends WithStyles<typeof styles> {
  description: string
  label: string
  image: string
}

function MediaCard({ classes, description, label, image }: MediaCardProps) {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={label} />
        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth size="large" color="primary">
          {label}
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(MediaCard)
