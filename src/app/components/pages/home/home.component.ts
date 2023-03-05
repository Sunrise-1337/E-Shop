import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterValues } from 'src/app/interfaces/filterValues';
import { Product } from 'src/app/interfaces/product';
import { CartAddAction } from 'src/app/store/cart/cart.actions';
import { filteredProductsData, sortedNPricedProductsData } from 'src/app/store/products/products.selectors';
import { getProducts } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sorting: string = 'A-Z';
  amount: number = 10;
  currentFilters: FilterValues = {
    minValue: 0,
    maxValue: 1000,
    category: '',
  };
  displayProducts$!: Observable<Product[]>;

  constructor(private store$: Store){}

  ngOnInit(): void {
    this.toUpdateProducts()
    this.toUpdateDisplay()
  }

  toAddProductToCart(prod: Product): void {
    this.store$.dispatch(CartAddAction({...prod, quantity: 1}))
  }

  onSortingChange(newSorting: string): void {
    this.sorting = newSorting
    this.toUpdateDisplay()
  }

  onAmountChange(newAmount: number): void {
    if (newAmount > this.amount) {
      this.amount = newAmount
      this.toUpdateProducts(this.currentFilters, newAmount)
    } else if (this.amount !== newAmount) {
      this.amount = newAmount
      this.toUpdateDisplay()
    }
  }

  onFiltersUpdate(filters: FilterValues) {
    if (filters.category == this.currentFilters.category){
      this.currentFilters = filters
      this.toUpdateDisplay()
    } else {
      this.toUpdateProducts(filters)
    }
  }

  toUpdateDisplay(){
    this.displayProducts$ = 
      this.store$
        .pipe(
          select(
            filteredProductsData(this.sorting, this.currentFilters.minValue, 
              this.currentFilters.maxValue, this.amount)
          )
        )
  }

  toUpdateProducts(filters: FilterValues = this.currentFilters, amount: number = this.amount): void {
    this.currentFilters = filters
    this.store$.dispatch(getProducts({
      payload: {
        amount: this.amount,
        category: this.currentFilters.category
      }
    }))
    this.displayProducts$ = 
      this.store$
        .pipe(
          select(
            sortedNPricedProductsData(this.sorting, this.currentFilters.minValue, 
              this.currentFilters.maxValue)
          )
        )
  }
}