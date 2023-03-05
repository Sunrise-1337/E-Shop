import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/interfaces/cartItem";

export const cartActionsType = {
  'add': '[CART] addItem',
  'removeOne': '[CART] removeOneItem',
  'removeUnit': '[CART] removeUnit',
  'clear': '[CART] clear'
}

export const CartAddAction = createAction(cartActionsType.add, props<CartItem>())

export const RemoveOneFromCart = createAction(cartActionsType.removeOne, props<CartItem>())

export const RemoveUnitFromCart = createAction(cartActionsType.removeUnit, props<CartItem>())

export const CartClearAction = createAction(cartActionsType.clear)