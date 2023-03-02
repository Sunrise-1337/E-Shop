import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartData, cartNode, CartState } from "./cart.reducers";

export const selectCartFeature = createFeatureSelector<CartState>(cartNode)

export const selectCartData = createSelector(
  selectCartFeature, 
  (state: CartState): CartData => state.cartData
)