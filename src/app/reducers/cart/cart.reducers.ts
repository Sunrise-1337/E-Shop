import { CartItem } from "src/app/interfaces/cartItem";
import { CartActions } from "./cart.actions";

export const cartNode = 'cart'

export interface CartState {
  items: CartItem[];
}

export const CartState = {
  items: []
}

export const cartReducer = (state = CartState, action: CartActions) => {
  switch(action.type){
    case '[CART] addItem':
      let id = state.items.find((el, i) => el.id === action.payload.id)
      if (id) return 5;

    case '[CART] removeItem':
      return ;

    case '[CART] clear':
      return ;

    default:
      return state;
  }
}