import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product.model";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { map, switchMap } from "rxjs/operators";

import * as fromApp from "../../store/app.reducer";
import * as ProductsActions from "../store/product.actions";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: number;
  productImage;
  itemImages = new Map();
  previewItem = [];
  selectedFilesItem?: File[] = [];
  currentFileItem?: File;
  routerSub: Subscription;
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    // This is necessary to check for router changes (product-list item clicked)
  }

  ngOnInit() {
    this.userSub = this.store
    .select("auth")
    .pipe(map((authState) => authState.user))
    .subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.route.params
      .pipe(
        map((params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("products");
        }),
        map((productsState) => {
          return productsState.products.find((product, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((product) => {
        this.product = product;
      });
    this.onImageLoad();
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onImageLoad();
      }
    });
  }

  onImageLoad(): void {
    // Product Upload
    if (this.product.upload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.productImage = e.target.result;
      };
      reader.readAsDataURL(this.product.upload.file.slice());
    }

    // Product item uploads
    this.itemImages = new Map();
    let imageIndexes = [];
    let imageArray = [];
    let i = 0;
    for (const item of this.product.items) {
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

  onAddToShoppingList() {
    this.store.dispatch(
      ShoppingListActions.ADD_ITEMS({
        product: this.product,
        items: this.product.items,
      })
    );
  }

  onAddSingleToShoppingList(index: number) {
    this.store.dispatch(
      ShoppingListActions.ADD_ITEM({
        item: this.product.items[index],
      })
    );
    alert("Item added to Shopping List");
  }

  onEditProduct() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteProduct() {
    this.store.dispatch(ProductsActions.DELETE_PRODUCT({ index: this.id }));
    this.router.navigate(["/products"]);
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    this.userSub.unsubscribe();
  }
}
