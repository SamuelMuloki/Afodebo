import { Button, TableHead, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import React from "react"
import { compose } from "recompose"
import { withContext } from "../Context/AppProvider"
import { addToCart, numberWithCommas, ProductDetails } from "../Utils/data"
import Pagination from "./pagination"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: "auto",
    },
    media: {
      height: "80px",
    },
    button: {
      margin: theme.spacing.unit,
    },
  })

export interface PaginationTableProps extends WithStyles<typeof styles> {
  products: Array<ProductDetails>
  context: any
}

export interface PaginationTableState {
  rows: Array<ProductDetails>
  page: number
  rowsPerPage: number
}

class PaginationTable extends React.Component<
  PaginationTableProps,
  PaginationTableState
> {
  state = {
    rows: this.props.products.sort((a, b) =>
      a.saleprice < b.saleprice ? -1 : 1
    ),
    page: 0,
    rowsPerPage: 5,
  }

  handleChangePage = (_event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    if (event.target.value) {
      this.setState({ rowsPerPage: parseFloat(event.target.value) })
    }
  }

  render() {
    const { classes, context } = this.props
    const { rows, rowsPerPage, page } = this.state
    let cartTotal = 0
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(pdt => {
                return context.items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(itm => {
                    if (itm._id === pdt._id) {
                      cartTotal += pdt.saleprice * itm.quantity
                      return (
                        <TableRow key={pdt._id}>
                          <TableCell component="th" scope="row">
                            {
                              <img
                                className={classes.media}
                                src={`http://localhost:1337${pdt.image.url}`}
                              />
                            }
                          </TableCell>
                          <TableCell>
                            <Typography noWrap>{pdt.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{itm.quantity}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap>
                              {`UGX ${numberWithCommas(
                                pdt.saleprice * itm.quantity
                              )}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              className={classes.button}
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                addToCart({ _id: pdt._id }, context)
                              }
                            >
                              +
                            </Button>
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
                              -
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    }
                  })
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>
                    <Typography>Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>{`UGX ${numberWithCommas(
                      cartTotal
                    )}`}</Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={3}
                  count={context.items.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

export default compose<{}, any>(
  withStyles(styles),
  withContext
)(PaginationTable)
