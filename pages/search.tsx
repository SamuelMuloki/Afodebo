import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { Query } from "react-apollo"
import { compose } from "recompose"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"
type ProductDetails = Container.ProductDetails

const GET_SEARCH_QUERY = gql`
  query($id: ID!) {
    brand(id: $id) {
      _id
      name
    }
    category(id: $id) {
      _id
      name
    }
  }
`

const styles = (theme: Theme) => createStyles({})

export interface QueryProps<T> {
  data: { brand: T; category: T }
  loading: boolean
  error?: ApolloError
}

export interface SearchProps extends WithStyles<typeof styles> {
  router: {
    query: { id: string; name: string }
  }
}

const Search = ({
  router: {
    query: { id, name },
  },
}: SearchProps) => (
  <Query query={GET_SEARCH_QUERY} variables={{ id, name }}>
    {({ loading, error, data }: QueryProps<ProductDetails>) => {
      if (error) return "Error loading searched Products"

      if (data) {
        return Object.keys(data)
          .reduce<ProductDetails[]>((_searchArray, value) => {
            if (data[value]) {
              const searchData = data[value]
              _searchArray.push(searchData)
            }
            return _searchArray
          }, [])
          .map(value => {
            if (value) {
              return <div>{value.name}</div>
            }
          })
      } else if (loading) {
        return <div />
      }
      return <div />
    }}
  </Query>
)

export default compose(
  withRouter,
  withStyles(styles),
  defaultPage
)(Search as any)
