import { actions } from "../actions"
import { MOBILE_DRAWER } from "../actions/constants"
import { StoreState } from "../states"

const INITIALSTATE: StoreState = {
  renderMobileDrawer: false,
}

export const AppBarReducer = (
  state: StoreState = INITIALSTATE,
  action: actions
): StoreState => {
  switch (action.type) {
    case MOBILE_DRAWER:
      return {
        ...state,
        renderMobileDrawer: !state.renderMobileDrawer,
      }
    default:
      return state
  }
}

export default AppBarReducer
