import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductImageContainerComponent } from './product-image-container/product-image-container.component';
import { HorizontalScrollBarComponent } from './horizontal-scroll-bar/horizontal-scroll-bar.component';
import { ProductsModule } from '../products/products.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { StoreModule } from '@ngrx/store';
import * as fromProducts from '../products/store/product.reducer';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductsResolverService } from '../products/products-resolver.service';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { HomeResolverService } from './home-resolver.service';

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
  // exports: [RouterModule],
})
export class HomeModule {}
