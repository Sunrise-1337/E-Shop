import { ActionReducerMap } from "@ngrx/store";
import { cartNode, cartReducer, CartState } from "./cart/cart.reducers";
import { productNode, productsReducer, ProductsState } from "./products/products.reducers";

export interface thisState{
  [cartNode]: CartState,
  [productNode]: ProductsState,
}

export const reducers: ActionReducerMap<thisState> = {
  [cartNode]: cartReducer,
  [productNode]: productsReducer
}