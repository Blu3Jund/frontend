import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import * as ProductsActions from "./product.actions";
import * as fromApp from "../../store/app.reducer";
import { Product } from "../../shared/models/product.model";

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
        // console.log("get request");
        // console.log(
        //   this.http.get<Product[]>(
        //     // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        //     // "http://localhost:8080/api/products",
        //     "https://bluejund.com:8443/api/products",
        //   )
        // );
        return this.http.get<Product[]>(
          // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
          // "http://localhost:8080/api/products",
          "https://bluejund.com/api/products",
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
          // const prod = productsState.products.forEach((product) => {
          //   const prodUpload = blobToB64String(product.upload.file);
          //
          //   const productEdited = {
          //     ...product,
          //     upload: {
          //       ...product.upload,
          //       file: prodUpload,
          //     },
          //     items: {},
          //   };
          //   console.log("prod edit ");
          //   console.log(productEdited);
          //
          //   return productEdited;
          // });
          //
          // // console.log("actionData");
          // // console.log(actionData);
          // console.log("product");
          // console.log(JSON.stringify(productsState.products));
          // console.log("parsed prod");
          // console.log(prod);
          // blobToB64String(productsState.products[0].upload.file);
          //
          // productsState.products;
          // console.log("put req");
          // console.log(
          //   this.http.post(
          //     // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
          //     "http://localhost:8080/api/products",
          //     productsState.products
          //   )
          // );
          return this.http.post(
            // "https://iprwc-f02e7-default-rtdb.europe-west1.firebasedatabase.app/products.json",
            "https://bluejund.com/api/products",
            // {
            //   name: "6",
            //   description: "6",
            //   items: [],
            //   categories: [],
            //   upload: {
            //     file_name: "pngwing.com.png",
            //     file: "JSON.stringify(new Blob())",
            //     upload_time: "2023-01-13T00:59:59.335Z",
            //   },
            // }
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
