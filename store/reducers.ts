import { combineReducers } from "redux"
import { AppBarReducer } from "./reducers/AppBarReducer"
import { IInitialState } from "./states"

export const combinedReducers = combineReducers<IInitialState>({
  AppBar: AppBarReducer,
})
