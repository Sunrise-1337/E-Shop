import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/interfaces/product";
import { productsLoaded } from "./products.actions";

export const productNode = 'product'

export interface ProductsState {
  products: Product[]
}

export const initialState: ProductsState = {
  products: [],
}

export const productsReducer = createReducer(initialState,
  on(productsLoaded, (state, item) => {
    return {
      ...state,
      products: item.payload
    }
  }),
)