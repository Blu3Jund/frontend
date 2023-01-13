import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as ProductsActions from "../store/product.actions";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { Upload } from "../../shared/models/upload.model";
import { Product } from "../../shared/models/product.model";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  productForm: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  selectedFilesItem?: File[];
  currentFileItem?: File;
  preview = "";
  previewItem = [];

  product: Product;

  imageFile: { file_name: string; file: Blob; upload_time: Date };
  imageFileItem: { file_name: string; file: Blob; upload_time: Date }[] = [];

  private routerSub: Subscription;
  private storeSub: Subscription;

  get controls() {
    return (this.productForm.get("items") as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
      this.onImageLoad();
      this.routerSub = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.onImageLoad();
        }
      });
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productForm.setControl("upload", new FormControl(this.imageFile));
      for (
        let i = 0;
        i < (this.productForm.get("items") as FormArray).length;
        i++
      ) {
        (
          (this.productForm.get("items") as FormArray).at(i) as FormGroup
        ).setControl("upload", new FormControl(this.imageFileItem[i]));
      }
      this.store.dispatch(
        ProductsActions.UPDATE_PRODUCT({
          index: this.id,
          product: this.productForm.value,
        })
      );
      console.log(this.productForm.value);
    } else {
      this.productForm.addControl("upload", new FormControl(this.imageFile));
      for (
        let i = 0;
        i < (this.productForm.get("items") as FormArray).length;
        i++
      ) {
        (
          (this.productForm.get("items") as FormArray).at(i) as FormGroup
        ).addControl("upload", new FormControl(this.imageFileItem[i]));
      }

      this.store.dispatch(
        ProductsActions.ADD_PRODUCT({ product: this.productForm.value })
      );
      console.log(this.productForm.value);
    }
    this.onCancel();
  }

  onAddItem() {
    (this.productForm.get("items") as FormArray).push(
      new FormGroup({
        sku: new FormControl(null, Validators.required),
        quantity_in_stock: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        price: new FormControl(null, [Validators.required]),
        // upload: new FormControl(null),
        variations: new FormControl(null),
      })
    );
  }

  onDeleteItem(index: number) {
    (this.productForm.get("items") as FormArray).removeAt(index);
    this.previewItem.splice(index, 1);
    this.imageFileItem.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  selectFile(event: any): void {
    this.preview = "";
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = "";
        this.currentFile = file;

        const currentUploadTime = new Date();

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;

          this.imageFile = {
            file_name: file.name,
            file: file.slice(),
            upload_time: currentUploadTime,
          };
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  selectFileItem(event: any, index: number): void {
    this.previewItem[index] = "";
    this.selectedFilesItem = event.target.files;

    if (this.selectedFilesItem) {
      const file: File | null = this.selectedFilesItem[0];

      if (file) {
        this.currentFileItem = file;
        const currentUploadTime = new Date();

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previewItem[index] = e.target.result;

          this.imageFileItem[index] = {
            file_name: file.name,
            file: file.slice(),
            upload_time: currentUploadTime,
          };
        };

        reader.readAsDataURL(this.currentFileItem);
      }
    }
  }

  onImageLoad(): void {
    // Product item uploads
    this.previewItem = [];
    if (this.product) {
      for (const item of this.product.items) {
        if (item.upload) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewItem.push(e.target.result);
          };
          reader.readAsDataURL(item.upload.file.slice());
        }
      }
    }
  }

  private initForm() {
    let productName = "";
    let productDescription = "";
    let productItems = new FormArray([]);
    let productCategories = new FormArray([]);

    if (this.editMode) {
      // const product = this.productService.getProduct(this.id);
      this.storeSub = this.store
        .select("products")
        .pipe(
          map((productState) => {
            return productState.products.find((product, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((product) => {
          this.product = product;
          productName = product.name;
          productDescription = product.description;

          if (product.upload) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
              this.preview = e.target.result;

              this.imageFile = {
                file_name: product.upload.file_name,
                file: product.upload.file.slice(),
                upload_time: product.upload.upload_time,
              };
            };

            reader.readAsDataURL(product.upload.file.slice());
          }

          if (product.items) {
            let i = 0;
            for (const item of product.items) {
              this.imageFileItem[i] = {
                file_name: item.upload.file_name,
                file: item.upload.file.slice(),
                upload_time: item.upload.upload_time,
              };
              if (productItems.length === i) {
                productItems.push(
                  new FormGroup({
                    sku: new FormControl(item.sku, Validators.required),
                    quantity_in_stock: new FormControl(item.quantity_in_stock, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/),
                    ]),
                    price: new FormControl(item.price, [Validators.required]),
                    // upload: new FormControl(this.imageFileItem[i]),
                    variations: new FormControl(item.variations),
                  })
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
                })
              );
            }
          }
        });
    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      items: productItems,
      categories: productCategories,
    });
  }
}
