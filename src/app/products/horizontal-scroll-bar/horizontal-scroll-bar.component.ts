import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-horizontal-scroll-bar',
  templateUrl: './horizontal-scroll-bar.component.html',
  styleUrls: ['./horizontal-scroll-bar.component.css'],
})
export class HorizontalScrollBarComponent {
  @Input() products: Product[];
}
