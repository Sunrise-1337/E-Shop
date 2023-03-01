import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { FilterValues } from 'src/app/interfaces/filterValues';
import { Product } from 'src/app/interfaces/product';
import { CartAddAction } from 'src/app/reducers/cart/cart.actions';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$!: Observable<Product[]> ;
  sorting: string = 'A-Z';
  amount: number = 12;
  currentFilters: FilterValues = {
    minValue: 0,
    maxValue: 1000,
    category: '',
  };

  constructor(private api: ApiService, private store: Store){}

  ngOnInit(): void {
    this.updateProducts(this.currentFilters)
  }

  addProductToCart(prod: Product): void {
    this.store.dispatch(CartAddAction({...prod, quantity: 1}))
  }

  changeSorting(newSorting: string): void {
    this.sorting = newSorting
    this.updateProducts(this.currentFilters)
  }

  changeAmount(newAmount: number): void {
    this.amount = newAmount
    this.updateProducts(this.currentFilters)
  }

  updateProducts(filters: FilterValues = this.currentFilters, amount: number = this.amount): void {
    this.currentFilters = filters
    this.products$ = 
      this.api.getProducts(amount, filters?.category)
        .pipe(
          map((array: Product[]) => {
            let filteredProducts = array.filter(el => filters.minValue <= el.price && el.price <= filters.maxValue)
            switch (this.sorting) {
              case 'A-Z':
                return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
              case 'Z-A':
                return filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
              case 'Price ↑':
                return filteredProducts.sort((a, b) => a.price - b.price);
              case 'Price ↓':
                return filteredProducts.sort((a, b) => b.price - a.price);
              case 'Rating ↑':
                return filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
              case 'Rating ↓':
                return filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
              default:
                return filteredProducts;
            }
          })
        )
  }
}
 