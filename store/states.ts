export interface ICounterState {
  count: number
}
export const CounterInitialState: ICounterState = {
  count: 1,
}

export interface IInitialState {
  counter: ICounterState
}

export const InitialState: IInitialState = {
  counter: CounterInitialState,
}
