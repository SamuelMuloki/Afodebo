import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import { Component, Fragment } from "react"
import "react-image-gallery/styles/css/image-gallery.css"
import { compose } from "recompose"
import Card from "../components/Card"
import defaultPage from "../components/hocs/defaultPage"
import ImageSlider from "../components/Slider"

const styles = () =>
  createStyles({
    root: {},
  })

interface IProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
}

class Index extends Component<IProps> {
  render() {
    return (
      <Fragment>
        <ImageSlider />
        <Card />
      </Fragment>
    )
  }
}

export default compose(
  defaultPage,
  withStyles(styles)
)(Index)
