import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as ProductsActions from './product.actions';
import * as fromApp from '../../store/app.reducer';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';
import { mockData } from '../../shared/mock-data';

@Injectable()
export class ProductEffects {
  deleteProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.DELETE_PRODUCTS),
        switchMap(() => {
          return this.http.delete(`${environment.HOST_ADDRESS}/api/products`);
        }),
      ),
    { dispatch: false },
  );

  // TODO finish this

  //

  mockProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.MOCK_PRODUCTS),
        withLatestFrom(this.store.select('products')),
        switchMap(([actionData, productsState]) => {
          return this.http.post(`${environment.HOST_ADDRESS}/api/products`, mockData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }),
      ),
    { dispatch: false },
  );

  // This might be wrong
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.FETCH_PRODUCTS),
      switchMap(() => {
        return this.http.get<Product[]>(`${environment.HOST_ADDRESS}/api/products`);
      }),
      map((products) => {
        return products.map((product) => {
          return {
            ...product,
            items: product.items ? product.items : [],
          };
        });
      }),
      map((products) => {
        return ProductsActions.SET_PRODUCTS({ products });
      }),
    ),
  );

  storeProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.STORE_PRODUCTS),
        withLatestFrom(this.store.select('products')),
        switchMap(([actionData, productsState]) => {
          console.log(productsState.products);
          return this.http.post(
            `${environment.HOST_ADDRESS}/api/products`,
            productsState.products,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
  ) {}
}
