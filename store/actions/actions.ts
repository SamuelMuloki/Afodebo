import * as constants from "./constants"

export interface MobileAnchor {
  type: constants.MOBILE_ANCHOR
  event: any
}

export interface Anchor {
  type: constants.ANCHOR
  event: any
}

export type actions = MobileAnchor | Anchor

export const MobileAnchor = (event: any): MobileAnchor => ({
  type: constants.MOBILE_ANCHOR,
  event,
})
export const Anchor = (event: any): Anchor => ({
  type: constants.ANCHOR,
  event,
})
