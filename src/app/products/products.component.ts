import { Component, OnInit } from "@angular/core";
import * as ProductActions from "./store/product.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.store.dispatch(ProductActions.FETCH_PRODUCTS());
  }
}
