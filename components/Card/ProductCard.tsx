import { Grid } from "@material-ui/core"
import React from "react"
import { Container } from "../Utils/namespace"
import SingleCard from "./SingleCard"

type ProductDetails = Container.ProductDetails

interface ProductCardProps {
  images: {
    _id: string
    name: string
    products: ProductDetails[]
  }
}

const ProductCard = ({ images }: ProductCardProps) => {
  return (
    <Grid container spacing={8}>
      {images.products.map(imgs => {
        return (
          <Grid key={imgs._id} item xs={6} sm={4} md={3} lg={2} zeroMinWidth>
            <SingleCard images={imgs} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductCard
