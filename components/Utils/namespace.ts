export namespace Container {
  export interface ProductDetails
    extends ColorDetails,
      CategoryDetails,
      CommonProps {
    brand: { _id: string; name: string }
    sellers: { name: string }
    images: Array<{ _id: string; image: [{ url: string }] }>
  }

  export interface ColorDetails {
    colors: Array<{ _id: string; name: string; products: Array<CommonProps> }>
  }

  export interface CategoryDetails {
    category: { _id: string; name: string; products: Array<CommonProps> }
  }

  export interface CommonProps {
    _id: string
    name: string
    description: string
    sku: string
    saleprice: number
    originalprice: number
    inventory: number
    slug: string
    image: [{ url: string }] & { url: string }
    sale: boolean
    active: boolean
  }
}
