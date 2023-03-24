import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { Item } from '../shared/models/item.model';
import { Product } from '../shared/models/product.model';
import formatMoney from '../../lib/formatMoney';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: Item[];
  // product: Observable<{ product: Product }>;

  productSub: Subscription;
  product: Product;
  email: string;
  itemSub: Subscription;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.email = user.email;
      });
    // this.subscription = this.store
    // .select('shoppingList')
    // .pipe(map((productsState) => productsState.products))
    // .subscribe((products: Product[]) => {
    //   this.products = products;
    // });
    // this.productSub = this.store
    //   .select('shoppingList')
    //   .pipe(map((productsState) => productsState.product))
    //   .subscribe((product: Product) => {
    //     this.product = product;
    //   });
    console.log(this.product);
    this.itemSub = this.store
      .select('shoppingList')
      .pipe(map((productsState) => productsState.items))
      .subscribe((items: Item[]) => {
        this.items = items;
      });
    console.log(this.items);
    // this.product.subscribe((product) => (this.prod = product.product));
    // this.items.subscribe((items) => (this.ite = items.items));
  }

  orderIte;

  onFormatMoney(value: number): string {
    return formatMoney(value);
  }

  onDeleteItem(index: number, { item }) {
    // this.store.dispatch(ShoppingListActions.START_EDIT({ index }));
    this.store.dispatch(ShoppingListActions.DELETE_ITEM({ item }));
    // this.store.dispatch(ShoppingListActions.STOP_EDIT());
  }

  onOrderItems(items: Item[], email: string) {
    this.store.dispatch(ShoppingListActions.ADD_ORDER({ items, email }));
  }
  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.START_EDIT({ index }));
  }
  ngOnDestroy() {
    this.productSub?.unsubscribe();
    this.itemSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
