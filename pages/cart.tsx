import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core"
import { createStyles } from "@material-ui/core/styles"
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import Head from "next/head"
import Router, { withRouter } from "next/router"
import { Component } from "react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import { compose } from "recompose"
import { Dispatch } from "redux"
import { withContext } from "../components/Context/AppProvider"
import defaultPage from "../components/hocs/defaultPage"
import { ProductDetails } from "../components/Utils/data"
import { MobileDrawer } from "../store/actions"

const styles = (theme: Theme) =>
  createStyles({
    media: {
      height: "80px",
    },
    table: {
      minWidth: 700,
    },
    button: {
      margin: theme.spacing.unit,
    },
  })

const getCartProducts = gql`
  {
    products {
      _id
      name
      saleprice
      originalprice
      slug
      inventory
      sellers {
        name
      }
      image {
        url
      }
    }
  }
`

interface CartProps extends WithStyles<typeof styles> {
  isAuthenticated: boolean
  loggedUser: string
  renderCategoryDrawer: (page?: string) => void
  context: any
}

export interface QueryProps {
  data: { products: Array<ProductDetails> }
  loading: boolean
  error?: ApolloError
}

class Cart extends Component<CartProps> {
  render() {
    const { context, classes } = this.props
    return (
      <>
        <Head>
          <title>
            {"Shoes, Sneakers, Boots + FREE DELIVERY | afodebo.com"}
          </title>
        </Head>
        <Query query={getCartProducts}>
          {({ data, loading, error }: QueryProps) => {
            if (error) return "Error loading products"

            if (data && data.products) {
              return (
                <>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.products.map(pdt => {
                        return context.items.map(itm => {
                          if (itm._id === pdt._id) {
                            return (
                              <TableRow key={pdt._id}>
                                <TableCell component="th" scope="row">
                                  {
                                    <img
                                      className={classes.media}
                                      src={`http://localhost:1337${
                                        pdt.image.url
                                      }`}
                                    />
                                  }
                                </TableCell>
                                <TableCell>{pdt.name}</TableCell>
                                <TableCell>{itm.quantity}</TableCell>
                                <TableCell>
                                  <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                      context.removeItem({
                                        _id: pdt._id,
                                      })
                                    }
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        })
                      })}
                    </TableBody>
                  </Table>
                  <Grid container direction="row" justify="flex-end">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => Router.push("/checkout", "/checkout")}
                    >
                      Checkout
                    </Button>
                  </Grid>
                </>
              )
            } else if (loading) {
              return <div />
            }
            return <div />
          }}
        </Query>
      </>
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
  withContext,
  defaultPage,
  withStyles(styles)
)

export default enhancer(Cart)
