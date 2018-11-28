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
    brand: { name: string }
    category: { name: string }
    sellers: { name: string }
    images: Array<{ _id: string; image: [{ url: string }] }>
  }
}
