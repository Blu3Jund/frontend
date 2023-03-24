import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as ShoppingListActions from './shopping-list.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Order } from '../../shared/models/order.model';

@Injectable()
export class ShoppingListEffects {
  addOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShoppingListActions.ADD_ORDER),
        withLatestFrom(this.store.select('shoppingList')),
        switchMap(([actionData, ordersState]) => {
          console.log(ordersState.order);
          return this.http.post(`${environment.HOST_ADDRESS}/api/order`, ordersState.order, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }),
      ),
    { dispatch: false },
  );

  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.FETCH_ORDERS),
      switchMap(() => {
        return this.http.get<Order[]>(`${environment.HOST_ADDRESS}/api/orders`);
      }),
      map((orders) => {
        return orders.map((order) => {
          return {
            ...order,
            email: order.email ? order.email : '',
            items: order.items ? order.items : [],
          };
        });
      }),
      map((orders) => {
        return ShoppingListActions.SET_ORDERS({ orders });
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
  ) {}
}
