import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartItem } from "src/app/interfaces/cartItem";
import { cartNode, CartState } from "./cart.reducers";

export const selectCartFeature = createFeatureSelector<CartState>(cartNode)

export const selectCart = createSelector(
  selectCartFeature, 
  (state: CartState): CartItem[] => state.items
)