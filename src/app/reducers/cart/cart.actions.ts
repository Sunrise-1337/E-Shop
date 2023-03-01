import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/interfaces/cartItem";

export const countActionsType = {
  'add': '[CART] addItem',
  'removeOne': '[CART] removeOneItem',
  'removeUnit': '[CART] removeUnit',
  'clear': '[CART] clear'
}

export const CartAddAction = createAction(countActionsType.add, props<CartItem>())

export const RemoveOneFromCart = createAction(countActionsType.removeOne, props<CartItem>())

export const RemoveUnitFromCart = createAction(countActionsType.removeUnit, props<CartItem>())

export const CartClearAction = createAction(countActionsType.clear)