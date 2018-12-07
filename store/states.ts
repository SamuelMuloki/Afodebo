export interface StoreState {
  renderMobileDrawer: boolean
  page: string
}

export interface IInitialState {
  AppBar: StoreState
}

const INITIALSTATE: StoreState = {
  renderMobileDrawer: false,
  page: "",
}

export const InitialState: IInitialState = {
  AppBar: INITIALSTATE,
}
