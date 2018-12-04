import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { Query } from "react-apollo"
import { compose } from "recompose"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"

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

type ProductDetails = Container.ProductDetails

const styles = (theme: Theme) => createStyles({})

export interface QueryProps {
  data: {
    brand: ProductDetails
    category: ProductDetails
  }
  loading: boolean
  error?: ApolloError
}

export interface SearchProps extends WithStyles<typeof styles> {
  router: {
    query: { id: string }
  }
}

const Search = ({
  router: {
    query: { id },
  },
}: SearchProps) => (
  <Query query={GET_SEARCH_QUERY} variables={{ id }}>
    {({ loading, error, data }: QueryProps) => {
      if (error) return "Error loading searched Products"

      if (data.brand) {
        return <div>{data.brand.name}</div>
      } else if (data.category) {
        return <div>{data.category.name}</div>
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
