import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-image-container',
  templateUrl: './product-image-container.component.html',
  styleUrls: ['./product-image-container.component.css'],
})
export class ProductImageContainerComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  ngOnInit() {
    console.log(this.product);
  }
}
