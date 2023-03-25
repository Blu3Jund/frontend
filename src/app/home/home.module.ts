import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductImageContainerComponent } from './product-image-container/product-image-container.component';
import { HorizontalScrollBarComponent } from './horizontal-scroll-bar/horizontal-scroll-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreModule } from '@ngrx/store';
import * as fromProducts from '../products/store/product.reducer';
import { HomeDetailsComponent } from './home-details/home-details.component';
@NgModule({
  declarations: [
    HomeComponent,
    HorizontalScrollBarComponent,
    ProductCardComponent,
    ProductImageContainerComponent,
    HomeDetailsComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: ':id',
        component: HomeDetailsComponent,
      },
    ]),
    SharedModule,
    StoreModule.forFeature('products', fromProducts.productReducer),
  ],
  exports: [ProductImageContainerComponent, HorizontalScrollBarComponent, HomeDetailsComponent],
})
export class HomeModule {}
