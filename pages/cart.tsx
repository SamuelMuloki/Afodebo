import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import Head from "next/head"
import { withRouter } from "next/router"
import { Component, Fragment } from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import { Dispatch } from "redux"
import defaultPage from "../components/hocs/defaultPage"
import { MobileDrawer } from "../store/actions"

const styles = () => createStyles({})

interface CartProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
  renderCategoryDrawer: (page?: string) => void
}

class Cart extends Component<CartProps> {
  render() {
    return (
      <Fragment>
        <Head>
          <title>
            {"Shoes, Sneakers, Boots + FREE DELIVERY | afodebo.com"}
          </title>
        </Head>
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

export default enhancer(Cart)
