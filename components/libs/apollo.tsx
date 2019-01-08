import { HttpLink } from "apollo-link-http"
import { withData } from "next-apollo"

const url =
  process.env.NODE_ENV === "production"
    ? "https://afodeboapi.herokuapp.com/graphql"
    : "http://localhost:1337/graphql"

const config = {
  link: new HttpLink({
    uri: url,
  }),
}
export const apolloData = withData(config)
