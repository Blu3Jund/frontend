import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/product.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import formatMoney from '../../../lib/formatMoney';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: number;
  routerSub: Subscription;
  private userSub: Subscription;
  isAuthenticated = false;
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
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('products');
        }),
        map((productsState) => {
          return productsState.products.find((product, index) => {
            return index === this.id;
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
    // alert('Item added to Shopping List');
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteProduct() {
    this.store.dispatch(ProductsActions.DELETE_PRODUCT({ index: this.id }));
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    this.userSub.unsubscribe();
  }
}
