import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Product } from "../../../shared/models/product.model";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  productImage;

  ngOnInit() {
    if (this.product.upload) {
      const reader = new FileReader();
      reader.readAsDataURL(this.product.upload.file);
      reader.onload = (e) => {
        this.productImage = e.target.result;
      };
    }
  }

  ngAfterViewInit() {}

  // onListItemSwap() {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.product.upload.file);
  //   reader.onload = (e) => {
  //     this.productImage[this.index] = e.target.result;
  //   };
  // this.dataService.changeProduct(prodNr);
  // const reader = new FileReader();
  // reader.readAsDataURL(this.product.upload.file);
  // reader.onload = (e) => {
  //   this.productImage[this.index] = e.target.result;
  // };
  // this.productDetailComponent.productChange(this.index);
  // }
}
