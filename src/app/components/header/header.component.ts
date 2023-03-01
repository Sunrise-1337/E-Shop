import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { thisState } from 'src/app/reducers';
import { selectCartData } from 'src/app/reducers/cart/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartData$ = this.store$.pipe(select(selectCartData))

  constructor(private store$: Store<thisState>) {}

}
