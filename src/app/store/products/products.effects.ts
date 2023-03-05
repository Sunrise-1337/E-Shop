import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from "@ngrx/effects"
import { Store } from "@ngrx/store";
import { mergeMap, tap } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { getProducts, productsLoaded } from "./products.actions";


@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(getProducts),    
    mergeMap((res) => {
      const { payload } = res;
      
      return this.api.getProducts(payload.amount, payload.category).pipe(
          tap((res) => {
            this.store.dispatch(productsLoaded({payload: res}))
          })
        )
      })
  ), { dispatch: false });

  constructor(private actions$: Actions, private api: ApiService, private store: Store) {}
}