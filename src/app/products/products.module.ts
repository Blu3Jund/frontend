import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import * as fromProducts from './store/product.reducer';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { HorizontalScrollBarComponent } from '../home/horizontal-scroll-bar/horizontal-scroll-bar.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductStartComponent,
    ProductEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', fromProducts.productReducer),
  ],
  exports: [ProductListComponent, ProductItemComponent],
})
export class ProductsModule {}
