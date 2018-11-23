import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import Router from "next/router"
import Strapi from "strapi-sdk-javascript/build/main"

const apiUrl = process.env.APIURL || "http://localhost:1337"
const strapi = new Strapi(apiUrl)

export const strapiRegister = (
  username: string,
  email: string,
  password: string
) => {
  if (!process.browser) {
    return undefined
  }

  strapi.register(username, email, password).then(res => {
    setToken(res)
  })
  return Promise.resolve()
}

export const strapiLogin = (email: string, password: string) => {
  if (!process.browser) {
    return
  }

  strapi.login(email, password).then(res => {
    setToken(res)
  })
  return Promise.resolve()
}

export const setToken = token => {
  if (!process.browser) {
    return
  }
  Cookies.set("username", token.user.username)
  Cookies.set("jwt", token.jwt)

  if (Cookies.get("username")) {
    Router.push("/")
  }
}

export const unsetToken = () => {
  if (!process.browser) {
    return
  }
  Cookies.remove("jwt")
  Cookies.remove("username")
  // Cookies.remove("cart")

  window.localStorage.setItem("logout", Date.now().toString())
  Router.push("/")
}

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined
  }

  let username = req.headers.cookie
    .split(";")
    .find(user => user.trim().startsWith("username="))
  if (username) {
    username = username.split("=")[1]
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split("=")[1]
  return jwtDecode(jwt), username
}

export const getUserFromLocalCookie = () => {
  return Cookies.get("username")
}

const getQueryParams = () => {
  const params = { id_token: undefined, state: undefined }
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($1, $3): any => {
      params[$1] = $3
    }
  )
  return params
}

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined
  }
  const { id_token, state } = getQueryParams()
  return { token: id_token, secret: state }
}
