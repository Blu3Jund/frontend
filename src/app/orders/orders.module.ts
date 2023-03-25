import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrdersResolverService } from './orders-resolver.service';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent,
        resolve: [OrdersResolverService],
      },
    ]),
    SharedModule,
  ],
})
export class OrdersModule {}
