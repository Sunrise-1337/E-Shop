import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CartItem } from 'src/app/interfaces/cartItem';
import { thisState } from 'src/app/store';
import { CartAddAction, CartClearAction, RemoveOneFromCart, RemoveUnitFromCart } from 'src/app/store/cart/cart.actions';
import { selectCartData } from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartData$ = this.store$.pipe(select(selectCartData))
  displayedColumns: Array<string> = ['image', 'name', 'price', 'quantity', 'total' , 'delete']

  constructor(private store$: Store<thisState>) {}

  decreaseAmount(prod: CartItem): void{
    this.store$.dispatch(RemoveOneFromCart({...prod, quantity: 1}))
  }

  increaseAmount(prod: CartItem): void{
    this.store$.dispatch(CartAddAction({...prod, quantity: 1}))
  }

  clearCart(): void{
    this.store$.dispatch(CartClearAction())
  }

  clearUnit(prod: CartItem): void{
    this.store$.dispatch(RemoveUnitFromCart({...prod, quantity: 1}))
  }
}
