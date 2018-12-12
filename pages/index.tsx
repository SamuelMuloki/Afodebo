import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import Head from "next/head"
import { withRouter } from "next/router"
import { Component, Fragment } from "react"
import "react-image-gallery/styles/css/image-gallery.css"
import { connect } from "react-redux"
import { compose } from "recompose"
import { Dispatch } from "redux"
import Brand from "../components/Brand"
import Card from "../components/Card"
import Category from "../components/Category"
import defaultPage from "../components/hocs/defaultPage"
import ImageSlider from "../components/Slider"
import { MobileDrawer } from "../store/actions"

const styles = () =>
  createStyles({
    root: {},
  })

interface IProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
  renderCategoryDrawer: (page?: string) => void
}

class Index extends Component<IProps> {
  render() {
    return (
      <Fragment>
        <Head>
          <title>
            {"Shoes, Sneakers, Boots + FREE DELIVERY | afodebo.com"}
          </title>
        </Head>
        <ImageSlider />
        <Card />
        <Brand />
        <Category />
      </Fragment>
    )
  }

  componentDidMount() {
    this.props.renderCategoryDrawer()
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<MobileDrawer>) => ({
  renderCategoryDrawer: (page: string) => dispatch(MobileDrawer(page)),
})

const enhancer = compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  withRouter,
  defaultPage,
  withStyles(styles)
)

export default enhancer(Index)
