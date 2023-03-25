import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ProductsActions from './store/product.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Product } from '../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsResolverService implements Resolve<{ products: Product[] }> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('products').pipe(
      take(1),
      map((productsState) => {
        return productsState.products;
      }),
      switchMap((products) => {
        if (products.length === 0) {
          this.store.dispatch(ProductsActions.FETCH_PRODUCTS());
          return this.actions$.pipe(ofType(ProductsActions.SET_PRODUCTS), take(1));
        } else {
          return of({ products });
        }
      }),
    );
  }
}
