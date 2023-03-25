import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../shared/models/order.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import formatMoney from '../../lib/formatMoney';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  user: User;
  subscription: Subscription;

  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.user = user;
      });

    this.subscription = this.store
      .select('shoppingList')
      .pipe(map((orderState) => orderState.orders))
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  onFormatMoney(money: number) {
    return formatMoney(money);
  }

  onSumOrder(order: Order) {
    return order.items.reduce((acc, item) => acc + item.price, 0);
  }

  isMyOrder(order: Order) {
    return order.email === this.user.email;
  }
}
