import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/interfaces/product";

export const productsActionsType = {
  'get': '[PRODUCTS] getProducts',
  'update': '[PRODUCTS] updateProducts'
}

export const getProducts = 
  createAction(
    productsActionsType.get, 
    props<{
      payload: {
        amount: number,
        category: string
      }
    }>())

export const productsLoaded = createAction(productsActionsType.update, props<{payload: Product[]}>())