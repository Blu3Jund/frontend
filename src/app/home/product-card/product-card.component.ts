import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() index: number;

  constructor(private route: ActivatedRoute, private router: Router) {}
}
