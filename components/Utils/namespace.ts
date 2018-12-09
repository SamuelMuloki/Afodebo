export namespace Container {
  export interface ProductDetails {
    _id: string
    name: string
    description: string
    sku: string
    saleprice: number
    originalprice: number
    slug: string
    image: [{ url: string }] & { url: string }
    brand: { _id: string; name: string }
    colors: { _id: string; name: string }
    category: { name: string }
    sellers: { name: string }
    sale: boolean
    active: boolean
    images: Array<{ _id: string; image: [{ url: string }] }>
  }
}
