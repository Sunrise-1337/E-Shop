import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "src/app/interfaces/product";
import { productNode, ProductsState } from "./products.reducers";

export const selectProductsFeature = createFeatureSelector<ProductsState>(productNode)

export const productsData = createSelector(
  selectProductsFeature, 
  (state: ProductsState): Product[] => state.products
)

export const sortedNPricedProductsData = (sorting: string, minValue: number = 0, 
            maxValue: number = 1000) => createSelector(
  productsData,
  (products: Product[]) => {
    return toSortAndPriceProducts(sorting, minValue, maxValue, products)
  }
)

export const filteredProductsData = (sorting: string, minValue: number = 0, 
            maxValue: number = 1000, amount: number) => createSelector(
  productsData,
  (products: Product[]) => {
    return toSortAndPriceProducts(sorting, minValue, maxValue, products).slice(0, amount)
  }
)

const toSortAndPriceProducts = (sorting: string, minValue: number = 0, 
      maxValue: number = 1000, products: Product[]) => {
  let newProducts = [...products]

  if (minValue && maxValue) {
    newProducts = newProducts.filter(el => {
      return minValue <= el.price && el.price <= maxValue
    })
  }

  switch (sorting) {
    case 'A-Z':
      newProducts = newProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'Z-A':
      newProducts = newProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'Price ↑':
      newProducts = newProducts.sort((a, b) => a.price - b.price);
      break;
    case 'Price ↓':
      newProducts = newProducts.sort((a, b) => b.price - a.price);
      break;
    case 'Rating ↑':
      newProducts = newProducts.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    case 'Rating ↓':
      newProducts = newProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  return newProducts
}