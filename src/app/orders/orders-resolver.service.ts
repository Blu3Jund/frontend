import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Order } from '../shared/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersResolverService implements Resolve<{ orders: Order[] }> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('shoppingList').pipe(
      take(1),
      map((ordersState) => {
        return ordersState.orders;
      }),
      switchMap((orders) => {
        if (orders.length === 0) {
          this.store.dispatch(ShoppingListActions.FETCH_ORDERS());
          return this.actions$.pipe(ofType(ShoppingListActions.SET_ORDERS), take(1));
        } else {
          return of({ orders });
        }
      }),
    );
  }
}
