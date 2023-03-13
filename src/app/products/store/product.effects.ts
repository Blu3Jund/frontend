import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import * as ProductsActions from "./product.actions";
import * as fromApp from "../../store/app.reducer";
import { Product } from "../../shared/models/product.model";
import {environment} from "../../../environments/environment";

function blobToB64String(blob: Blob) {
  // The full Blob Object can be seen
  // in the Console of the Browser
  // console.log("Blob - ", blob);
  let str = "";

  // const reader = new FileReader();
  //
  // return new Promise((resolve, reject) => {
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     resolve(reader.result);
  //   };
  //   reader.onerror = () => {
  //     reader.abort();
  //     reject(new DOMException("Problem parsing file"));
  //   };
  // });

  // reader.readAsDataURL(blob);
  // reader.onloadend = function () {
  //   const base64String = reader.result;
  //   const b64 = base64String
  //     .toString()
  //     .substring(base64String.toString().indexOf(",") + 1);
  //   // console.log("Base64 String - ", base64String);
  //   // console.log("b64 - ", b64);
  //   str = b64;
  //   return b64;
  //
  //   // Simply Print the Base64 Encoded String,
  //   // without additional data: Attributes.
  //   // console.log('Base64 String without Tags- ' +
  //   //   base64String.slice.substr(base64String.indexOf(', ') + 1))
  // };
  // return str;
}

@Injectable()
export class ProductEffects {
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.FETCH_PRODUCTS),
      switchMap(() => {
        return this.http.get<Product[]>(
          `${environment.HOST_ADRESS}/api/products`,
        );
      }),
      map((products) => {
        return products.map((product) => {
          return {
            ...product,
            items: product.items ? product.items : [],
          };
        });
      }),
      map((products) => {
        return ProductsActions.SET_PRODUCTS({ products });
      })
    )
  );

  storeProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.STORE_PRODUCTS),
        withLatestFrom(this.store.select("products")),
        switchMap(([actionData, productsState]) => {
          return this.http.post(
            `${environment.HOST_ADRESS}/api/products`,
            productsState.products,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
