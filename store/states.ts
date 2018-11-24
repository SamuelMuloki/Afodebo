export interface StoreState {
  anchorEl: any
  mobileMoreAnchorEl: any
}

export interface IInitialState {
  AppBar: StoreState
}

const INITIALSTATE: StoreState = {
  anchorEl: null,
  mobileMoreAnchorEl: null,
}

export const InitialState: IInitialState = {
  AppBar: INITIALSTATE,
}
