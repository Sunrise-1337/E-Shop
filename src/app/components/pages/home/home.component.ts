import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { FilterValues } from 'src/app/interfaces/filterValues';
import { Product } from 'src/app/interfaces/product';
import { CartAddAction } from 'src/app/store/cart/cart.actions';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rawProducts$!: Observable<Product[]>;
  displayProducts$!: Observable<Product[]>;
  sorting: string = 'A-Z';
  amount: number = 10;
  currentFilters: FilterValues = {
    minValue: 0,
    maxValue: 1000,
    category: '',
  };

  constructor(private api: ApiService, private store: Store){}

  ngOnInit(): void {
    this.toUpdateProducts(this.currentFilters)
  }

  toAddProductToCart(prod: Product): void {
    this.store.dispatch(CartAddAction({...prod, quantity: 1}))
  }

  onSortingChange(newSorting: string): void {
    this.sorting = newSorting
    this.toUpdateDisplay()
  }

  onAmountChange(newAmount: number): void {
    if (newAmount > this.amount) {
      this.toUpdateProducts(this.currentFilters, newAmount)
    } else {
      this.displayProducts$ = 
        this.toUpdateDisplay()
          .pipe(
            map((el: Product[]) => {
              let toDelete = el.length-newAmount
              el.splice(toDelete - 1, toDelete)
              return el
            })
          )
    }

    this.amount = newAmount
  }

  toFilter(array: Product[]){
    return array.filter(el => this.currentFilters.minValue <= el.price && el.price <= this.currentFilters.maxValue)
  }

  toSort(array: Product[]){
    switch (this.sorting) {
      case 'A-Z':
        return array.sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return array.sort((a, b) => b.title.localeCompare(a.title));
      case 'Price ↑':
        return array.sort((a, b) => a.price - b.price);
      case 'Price ↓':
        return array.sort((a, b) => b.price - a.price);
      case 'Rating ↑':
        return array.sort((a, b) => a.rating.rate - b.rating.rate);
      case 'Rating ↓':
        return array.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return array;
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

  toUpdateDisplay() {
    return this.displayProducts$ = this.rawProducts$.pipe(
      map(el => {
        return this.toSort(this.toFilter(el))
      })
    )
  }

  toUpdateProducts(filters: FilterValues = this.currentFilters, amount: number = this.amount): void {
    this.currentFilters = filters
    this.rawProducts$ = 
      this.api.getProducts(amount, filters?.category)
        .pipe(
          first()
        )
    this.toUpdateDisplay()
  }
}