import { HttpLink } from "apollo-link-http"
import { withData } from "next-apollo"

const config = {
  link: new HttpLink({
    uri: "https://afodeboapi.herokuapp.com/graphql",
  }),
}
export const apolloData = withData(config)
