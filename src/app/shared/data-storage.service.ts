import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../products/product.service";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as ProductActions from "../products/store/product.actions";
import { Product } from "./models/product.model";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private store: Store<fromApp.AppState>
  ) {}

  storeProducts() {
    const products = this.productService.getProducts();
    this.http
      .put(
        // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        // "http://localhost:8080/api/products",
        `${environment.HOST_ADRESS}/api/products`,
        products
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchProducts() {
    return this.http
      .get<Product[]>(
        // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        // "http://localhost:8080/api/products"
        `${environment.HOST_ADRESS}/api/products`
      )
      .pipe(
        map((products) => {
          return products.map((product) => {
            return {
              ...product,
              items: product.items ? product.items : [],
            };
          });
        }),
        tap((products) => {
          // this.productService.setProducts(products);
          this.store.dispatch(ProductActions.SET_PRODUCTS({ products }));
        })
      );
  }
}
