export function discount(salePrice: number, originalPrice: number) {
  return Math.round(100 - (salePrice / originalPrice) * 100)
}
