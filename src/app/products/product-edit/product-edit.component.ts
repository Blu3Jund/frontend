import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductsActions from '../store/product.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  productForm: FormGroup;

  product: Product;

  private routerSub: Subscription;
  private storeSub: Subscription;

  get controls() {
    return (this.productForm.get('items') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        ProductsActions.UPDATE_PRODUCT({
          index: this.id,
          product: this.productForm.value,
        }),
      );
    } else {
      this.store.dispatch(ProductsActions.ADD_PRODUCT({ product: this.productForm.value }));
      console.log(this.productForm.value);
    }

    this.onCancel();
  }

  onAddItem() {
    (this.productForm.get('items') as FormArray).push(
      new FormGroup({
        sku: new FormControl(null, Validators.required),
        quantity_in_stock: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        price: new FormControl(null, [Validators.required]),
        image: new FormControl(null),
        variations: new FormControl(null),
      }),
    );
  }

  onDeleteItem(index: number) {
    (this.productForm.get('items') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private initForm() {
    let productName = '';
    let productDescription = '';
    let productImage = { imageUrl: '', imageName: '' };
    let productItems = new FormArray([]);
    let productCategories = new FormArray([]);

    if (this.editMode) {
      // const product = this.productService.getProduct(this.id);
      this.storeSub = this.store
        .select('products')
        .pipe(
          map((productState) => {
            return productState.products.find((product, index) => {
              return index === this.id;
            });
          }),
        )
        .subscribe((product) => {
          this.product = product;
          productName = product.name;
          productDescription = product.description;
          productImage = { imageUrl: product.image.image_url, imageName: product.image.image_name };

          if (product.items) {
            let i = 0;
            for (const item of product.items) {
              if (productItems.length === i) {
                productItems.push(
                  new FormGroup({
                    sku: new FormControl(item.sku, Validators.required),
                    quantity_in_stock: new FormControl(item.quantity_in_stock, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/),
                    ]),
                    price: new FormControl(item.price, [Validators.required]),
                    image: new FormControl(item.image),
                    variations: new FormControl(item.variations),
                  }),
                );
              }
              i++;
            }
          }
          if (product.categories) {
            for (const category of product.categories) {
              productCategories.push(
                new FormGroup({
                  name: new FormControl(category.name, Validators.required),
                  parent_id: new FormControl(category.parent_id),
                }),
              );
            }
          }
        });
    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      image: new FormControl(productImage),
      items: productItems,
      categories: productCategories,
    });
  }
}
