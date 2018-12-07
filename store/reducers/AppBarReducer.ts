import { MobileDrawer } from "../actions"
import { MOBILE_DRAWER } from "../actions/constants"
import { StoreState } from "../states"

const INITIALSTATE: StoreState = {
  renderMobileDrawer: false,
  page: "",
}

export const AppBarReducer = (
  state: StoreState = INITIALSTATE,
  action: MobileDrawer
): StoreState => {
  switch (action.type) {
    case MOBILE_DRAWER:
      return {
        ...state,
        renderMobileDrawer: action.page ? true : false,
      }
    default:
      return state
  }
}

export default AppBarReducer
