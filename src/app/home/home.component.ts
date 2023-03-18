import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('products')
      .pipe(map((productsState) => productsState.products))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
    console.log(this.products);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
