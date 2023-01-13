import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";
import { Product } from "../shared/models/product.model";
import { Item } from "../shared/models/item.model";

@Injectable()
export class ProductService {
  productsChanged = new Subject<Product[]>();
  // private products: Product[] = [
  // 	new Product(
  // 		'Soup',
  // 		'This is a test description',
  // 		'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
  // 		[
  // 			new Item('Bullion', 1),
  // 			new Item('Paprika', 4)
  // 		]),
  // 	new Product(
  // 		'Brain Tomatoes',
  // 		'Tomato is smort',
  // 		'https://i.redd.it/fq6f7ov9p9n51.jpg',
  // 		[
  // 			new Item('Brain', 1),
  // 			new Item('Tomatoes', 3)
  // 		])
  // ];
  private products: Product[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  // addItemsToShoppingList(items: Item[]) {
  //   // this.slService.addItems(items);
  //   this.store.dispatch(ShoppingListActions.ADD_ITEMS({ items }));
  // }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
