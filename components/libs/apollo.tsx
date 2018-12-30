import { HttpLink } from "apollo-link-http"
import { withData } from "next-apollo"

const config = {
  link: new HttpLink({
    uri: "http://localhost:1337/graphql",
  }),
}
export const apolloData = withData(config)
