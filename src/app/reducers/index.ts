import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { cartNode, cartReducer, CartState } from "./cart/cart.reducers";

export interface State{
  [cartNode]: CartState
}

export const reducers: ActionReducerMap<State> = {
  [cartNode]: cartReducer as ActionReducer<CartState>
}