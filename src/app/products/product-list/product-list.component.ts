import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("products")
      .pipe(map((productsState) => productsState.products))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  onNewProduct() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
