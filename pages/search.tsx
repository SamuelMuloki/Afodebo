import { createStyles, WithStyles, withStyles } from "@material-ui/core"
import { ApolloError } from "apollo-client"
import gql from "graphql-tag"
import { withRouter } from "next/router"
import React from "react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import { compose } from "recompose"
import { Dispatch } from "redux"
import ProductCard from "../components/Card/ProductCard"
import defaultPage from "../components/hocs/defaultPage"
import { Container } from "../components/Utils/namespace"
import { MobileDrawer } from "../store/actions"
type ProductDetails = Container.ProductDetails
type ColorDetails = Container.ColorDetails

export const searchQuery = `
  _id
  name
  products {
    _id
    name
    saleprice
    slug
    image {
      url
    }
    brand {
      _id
      name
    }
    colors {
      _id
      name
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
    colors {
      _id
      name
    }
  }
`

const styles = () => createStyles({})

export interface QueryProps<T> {
  data: { brand: T; category: T; colors: ColorDetails }
  loading: boolean
  error?: ApolloError
}

export interface SearchProps extends WithStyles<typeof styles> {
  router: {
    query: { id: string; name: string }
  }
  renderCategoryDrawer: (page?: string) => void
}

class Search extends React.Component<SearchProps> {
  render() {
    const {
      router: {
        query: { id },
      },
    } = this.props
    return (
      <Query query={GET_SEARCH_QUERY} variables={{ id }}>
        {({ loading, error, data }: QueryProps<ProductDetails>) => {
          if (error) return "Error loading searched Products"

          if (data) {
            const searchdata = Object.keys(data).reduce<any>(_searchObj => {
              _searchObj = { ...data }
              return _searchObj
            }, {})
            if (searchdata.category) {
              return <ProductCard searchData={searchdata} />
            }
          } else if (loading) {
            return <div />
          }
          return <div />
        }}
      </Query>
    )
  }

  componentDidMount() {
    this.props.renderCategoryDrawer("search")
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
  withStyles(styles),
  defaultPage
)

export default enhancer(Search)
