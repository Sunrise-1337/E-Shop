import { ActionReducerMap } from "@ngrx/store";
import { cartNode, cartReducer, CartState } from "./cart/cart.reducers";

export interface thisState{
  [cartNode]: CartState
}

export const reducers: ActionReducerMap<thisState> = {
  [cartNode]: cartReducer
}