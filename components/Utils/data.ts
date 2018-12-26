import { Container } from "./namespace"
export type ProductDetails = Container.ProductDetails

export function discount(salePrice: number, originalPrice: number) {
  return Math.round(100 - (salePrice / originalPrice) * 100)
}

export function removeSpaces(name: string) {
  return name.replace(/ /g, "-")
}

export function getOccurrence(array: Array<any>, value: any) {
  return array.filter(v => v === value).length
}

export function numberWithCommas(x: number) {
  const parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

export function addToCart(item: ProductDetails) {
  if (item && item.inventory !== 0) {
    this.props.context.addItem(item)
  }
}
