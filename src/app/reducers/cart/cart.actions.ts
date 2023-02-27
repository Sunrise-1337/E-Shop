import { Action } from "@ngrx/store";
import { CartItem } from "src/app/interfaces/cartItem";

export const countActionsType = {
  'add': '[CART] addItem',
  'remove': '[CART] removeItem',
  'clear': '[CART] clear'
}

export class CartAddAction implements Action{
  readonly type = countActionsType.add

  constructor(public payload: {
    item: CartItem
  }) {}
}

export class CartRemoveAction implements Action{
  readonly type = countActionsType.remove

  constructor(public payload: {
    item: CartItem
  }) {}
}

export class CartClearAction implements Action{
  readonly type = countActionsType.clear

}

export type CartActions = CartAddAction | CartRemoveAction | CartClearAction