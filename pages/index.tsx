import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import { SFC } from "react"
import { compose } from "recompose"
import Card from "../components/Card"
import defaultPage from "../components/hocs/defaultPage"

const styles = () =>
  createStyles({
    root: {},
  })

interface IProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
}

const Index: SFC<IProps> = ({ loggedUser }) => {
  return <Card />
}

export default compose(
  defaultPage,
  withStyles(styles)
)(Index)
