import * as constants from "./constants"

export interface MobileDrawer {
  type: constants.MOBILE_DRAWER
}

export type actions = MobileDrawer

export const MobileDrawer = (): MobileDrawer => ({
  type: constants.MOBILE_DRAWER,
})
