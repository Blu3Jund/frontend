import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import formatMoney from '../../../lib/formatMoney';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() index: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  // onClick() {
  //   this.router.navigate([`/home/${this.product.id}`]);
  // }
}
