export function discount(salePrice: number, originalPrice: number) {
  return Math.round(100 - (salePrice / originalPrice) * 100)
}

export function removeSpaces(name: string) {
  return name.replace(/ /g, "-")
}

export function getOccurrence(array: Array<any>, value: any) {
  return array.filter(v => v === value).length
}
