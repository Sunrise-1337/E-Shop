import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/interfaces/cartItem";
import { CartAddAction, CartClearAction, RemoveOneFromCart, RemoveUnitFromCart } from "./cart.actions";

export const cartNode = 'cart'

export interface CartData {
  cartItems: CartItem[];
  totalPrice: number;
  amountItems: number;
}

export interface CartState {
  cartData: CartData
}

export const initialState: CartState = {
  cartData: {
    cartItems: [],
    totalPrice: 0,
    amountItems: 0,
  }
}

export const cartReducer = createReducer(initialState,
  on(CartAddAction, (state, item) => {
    const { cartData } = state;
    let id = cartData.cartItems.findIndex((el: CartItem) => el.id === item.id),
        items: CartItem[] = [...cartData.cartItems];

    if (id !== -1) {
      items[id] = {...items[id], quantity: items[id].quantity + 1}
    } else {
      items.push(item)
    }

    let newAmount = items.reduce((acc, el) => acc = acc + el.price * el.quantity, 0)

    return {
      cartData: {
        cartItems: items, 
        totalPrice: newAmount, 
        amountItems: cartData.amountItems + 1
      }
    }
  }),

  on(RemoveOneFromCart, (state, item) => {
    const { cartData } = state,
          { cartItems } = cartData;

    let copyItems = cartItems.map((el: CartItem) => {
      if (el.id === item.id) {
        return {
          ...el,
          quantity: el.quantity - 1
        }
      }
      
      return el
    })

    return {
      cartData: {
        cartItems: copyItems,
        totalPrice: state.cartData.totalPrice - item.price,
        amountItems: state.cartData.amountItems - 1
      }
    }
  }),

  on(RemoveUnitFromCart, (state, item) => {
    let copyItems = [...state.cartData.cartItems],
        itemToDelete = copyItems.findIndex((el: CartItem) => el.id === item.id),
        quantityToDelete = copyItems[itemToDelete].quantity,
        price = copyItems[itemToDelete].price * quantityToDelete

    copyItems.splice(itemToDelete, 1)

    return {
      cartData: {
        cartItems: copyItems,
        totalPrice: state.cartData.totalPrice - price,
        amountItems: state.cartData.amountItems - quantityToDelete
      }
    }
  }),
  
  on(CartClearAction, () => {
    return {
      cartData: {
        cartItems: [],
        totalPrice: 0,
        amountItems: 0
      }
    }
  })
)