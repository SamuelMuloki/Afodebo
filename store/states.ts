export interface StoreState {
  renderMobileDrawer: boolean
}

export interface IInitialState {
  AppBar: StoreState
}

const INITIALSTATE: StoreState = {
  renderMobileDrawer: false,
}

export const InitialState: IInitialState = {
  AppBar: INITIALSTATE,
}
