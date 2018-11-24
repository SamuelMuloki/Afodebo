import { actions } from "../actions/actions"
import { ANCHOR, MOBILE_ANCHOR } from "../actions/constants"
import { StoreState } from "../states"

const INITIALSTATE: StoreState = {
  anchorEl: null,
  mobileMoreAnchorEl: null,
}

export const AppBarReducer = (
  state: StoreState = INITIALSTATE,
  action: actions
): StoreState => {
  switch (action.type) {
    case ANCHOR:
      return {
        ...state,
        anchorEl: action.event ? action.event.currentTarget : null,
      }
    case MOBILE_ANCHOR:
      return {
        ...state,
        mobileMoreAnchorEl: action.event ? action.event.currentTarget : null,
      }
    default:
      return state
  }
}

export default AppBarReducer
