// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { Product } from '../../shared/models/product.model';
//
// @Component({
//   selector: 'app-horizontal-scroll-bar',
//   templateUrl: './horizontal-scroll-bar.component.html',
//   styleUrls: ['./horizontal-scroll-bar.component.css'],
// })
// export class HorizontalScrollBarComponent {
//   @Input() products: Product[];
//
//   private container: HTMLElement;
//
//   ngOnInit() {
//     this.container = document.querySelector('.container');
//   }
//
//   scrollLeft() {
//     this.container.scrollTo({
//       left: this.container.scrollLeft - this.container.offsetWidth,
//       behavior: 'smooth',
//     });
//   }
//
//   scrollRight() {
//     this.container.scrollTo({
//       left: this.container.scrollLeft + this.container.offsetWidth,
//       behavior: 'smooth',
//     });
//   }
// }

import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-horizontal-scroll-bar',
  templateUrl: './horizontal-scroll-bar.component.html',
  styleUrls: ['./horizontal-scroll-bar.component.css'],
})
export class HorizontalScrollBarComponent {
  @Input() products: Product[];
  // products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 25;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return this.currentPage * this.pageSize;
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.pageSize);
  }

  constructor() {}

  prevPage() {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }
}
