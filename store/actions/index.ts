import * as constants from "./constants"

export interface MobileDrawer {
  type: constants.MOBILE_DRAWER
  page: string
}

export const MobileDrawer = (page: string): MobileDrawer => ({
  type: constants.MOBILE_DRAWER,
  page,
})
