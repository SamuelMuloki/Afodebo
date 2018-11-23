import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import { SFC } from "react"
import { compose } from "recompose"
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
  return <main>{loggedUser}</main>
}

export default compose(
  defaultPage,
  withStyles(styles)
)(Index)
