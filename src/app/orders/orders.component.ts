import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../shared/models/order.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import formatMoney from '../../lib/formatMoney';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .pipe(map((orderState) => orderState.orders))
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onFormatMoney(money: number) {
    return formatMoney(money);
  }
}
