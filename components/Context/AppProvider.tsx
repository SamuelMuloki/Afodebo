import Cookies from "js-cookie"
import React from "react"

export interface AppProviderState {
  items: any
  total: any
}

export interface AppContextInterface {
  items: any
  addItem: any
  removeItem: any
  total: any
}

const AppContext = React.createContext<AppContextInterface | null>(null)

class AppProvider extends React.Component<{}, AppProviderState> {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      total: 0,
    }
  }
  componentDidMount() {
    const cart = Cookies.getJSON("cart")

    let total = 0
    if (cart) {
      cart.forEach(item => {
        total += item.saleprice * item.quantity
      })
      this.setState(
        {
          items: cart,
          total: total,
        },
        () => console.log(this.state)
      )
    }
  }

  addItem = item => {
    let { items } = this.state
    const newItem = items.find(i => i._id === item._id)

    if (!newItem) {
      item.quantity = 1
      this.setState(
        {
          items: this.state.items.concat(item),
          total: this.state.total + item.saleprice,
        },
        () => Cookies.set("cart", this.state.items)
      )
    } else {
      this.setState(
        {
          items: this.state.items.map(
            item =>
              item._id === newItem._id
                ? Object.assign({}, item, {
                    quantity: item.quantity + 1,
                  })
                : item
          ),
          total: this.state.total + item.saleprice,
        },
        () => Cookies.set("cart", this.state.items)
      )
    }
  }
  removeItem = item => {
    let { items } = this.state

    const newItem = items.find(i => i._id === item._id)
    if (newItem.quantity > 1) {
      this.setState(
        {
          items: this.state.items.map(
            item =>
              item._id === newItem._id
                ? Object.assign({}, item, {
                    quantity: item.quantity - 1,
                  })
                : item
          ),
          total: this.state.total - item.saleprice,
        },
        () => Cookies.set("cart", this.state.items)
      )
    } else {
      const items = [...this.state.items]
      const index = items.findIndex(i => i._id === newItem._id)

      items.splice(index, 1)
      this.setState(
        {
          items: items,
          total: this.state.total - item.saleprice,
        },
        () => Cookies.set("cart", this.state.items)
      )
    }
  }
  render() {
    return (
      <AppContext.Provider
        value={{
          items: this.state.items,
          addItem: this.addItem,
          removeItem: this.removeItem,
          total: this.state.total,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    )
  }
}

export default AppProvider