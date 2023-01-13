import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";
import { Item } from "../shared/models/item.model";
import { Product } from "../shared/models/product.model";
import { NavigationEnd } from "@angular/router";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  items: Observable<{ items: Item[] }>;
  product: Observable<{ product: Product }>;

  prod;
  ite;

  itemImages = new Map();
  productImage;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.product = this.store.select("shoppingList");
    this.items = this.store.select("shoppingList");

    this.product.subscribe((product) => (this.prod = product.product));
    this.items.subscribe((items) => (this.ite = items.items));

    this.onImageLoad();
  }

  onDeleteItem(index: number, { item }) {
    // this.store.dispatch(ShoppingListActions.START_EDIT({ index }));
    let tempMap = new Map();
    this.itemImages.forEach((value, key) => {
      if (key > index) {
        tempMap.set(key - 1, value);
      } else {
        tempMap.set(key, value);
      }
    });
    this.itemImages = tempMap;
    this.store.dispatch(ShoppingListActions.DELETE_ITEM({ item }));
    // this.store.dispatch(ShoppingListActions.STOP_EDIT());
  }

  onImageLoad(): void {
    // Product Upload
    if (this.prod.upload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.productImage = e.target.result;
      };
      reader.readAsDataURL(this.prod.upload.file.slice());
    }

    // // Product item uploads
    // this.itemImages = [];
    // for (const item of this.ite) {
    //   if (item.upload) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.itemImages.push(e.target.result);
    //     };
    //     reader.readAsDataURL(item.upload.file.slice());
    //   }
    // }

    // Product item uploads
    this.itemImages = new Map();
    let imageIndexes = [];
    let imageArray = [];
    let i = 0;
    for (const item of this.ite) {
      if (item.upload) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageArray.push(e.target.result);
          for (let k = 0; k < imageArray.length; k++) {
            this.itemImages.set(imageIndexes[k], imageArray[k]);
          }
        };
        imageIndexes.push(i);
        reader.readAsDataURL(item.upload.file.slice());
      }
      i++;
    }
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.START_EDIT({ index }));
  }
}
