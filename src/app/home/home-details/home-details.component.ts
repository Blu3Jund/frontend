import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as ProductActions from '../../products/store/product.actions';
import formatMoney from '../../../lib/formatMoney';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css'],
})
export class HomeDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  id: string;
  productSub: Subscription;
  routerSub: Subscription;
  itemAdded = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {
    // This is necessary to check for router changes (product-list item clicked)
  }

  onFormatMoney(value: number): string {
    return formatMoney(value);
  }
  ngOnInit() {
    const productId = this.route.snapshot.params.id;
    this.productSub = this.store
      .select('products')
      .pipe(
        map((productsState) => {
          return productsState.products.find((product) => {
            return product.id === productId;
          });
        }),
      )
      .subscribe((product) => {
        this.product = product;
      });
  }
  onAddToShoppingList() {
    this.store.dispatch(
      ShoppingListActions.ADD_ITEMS({
        product: this.product,
        items: this.product.items,
      }),
    );
  }

  onAddSingleToShoppingList(index: number) {
    this.store.dispatch(
      ShoppingListActions.ADD_ITEM({
        item: this.product.items[index],
      }),
    );
    this.itemAdded[index] = true;

    const updatedProduct = { ...this.product };
    const itemToUpdate = { ...updatedProduct.items[index] };
    itemToUpdate.quantity_in_stock = itemToUpdate.quantity_in_stock - 1;
    const updatedItems = [...updatedProduct.items];
    updatedItems[index] = itemToUpdate;
    updatedProduct.items = updatedItems;
    this.store.dispatch(ProductActions.UPDATE_PRODUCT({ index: null, product: updatedProduct }));
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    this.productSub?.unsubscribe();
  }
}
