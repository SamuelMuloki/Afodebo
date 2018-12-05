import { createStyles, WithStyles, withStyles } from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { Query } from "react-apollo"
import { compose } from "recompose"
import ProductCard from "../components/Card/ProductCard"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"
type ProductDetails = Container.ProductDetails

export const searchQuery = `
  _id
  name
  products {
    _id
    name
    saleprice
    description
    image {
      url
    }
    sellers {
      name
    }
    images {
      _id
      name
      image {
        url
      }
    }
  }
`

const GET_SEARCH_QUERY = gql`
  query($id: ID!) {
    brand(id: $id) {
      ${searchQuery}
    }
    category(id: $id) {
      ${searchQuery}
    }
  }
`

const styles = () => createStyles({})

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
          .reduce<any[]>((_searchArray, value) => {
            if (data[value]) {
              const searchData = data[value]
              _searchArray.push(searchData)
            }
            return _searchArray
          }, [])
          .map(value => {
            if (value) {
              return <ProductCard key={value._id} images={value} />
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
