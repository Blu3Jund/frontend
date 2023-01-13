import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";
import { AuthGuardService } from "../auth/auth.guard.service";
import { ProductStartComponent } from "./product-start/product-start.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsResolverService } from "./products-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: ProductStartComponent },
      { path: "new", component: ProductEditComponent },
      {
        path: ":id",
        component: ProductDetailComponent,
        resolve: [ProductsResolverService],
      },
      {
        path: ":id/edit",
        component: ProductEditComponent,
        resolve: [ProductsResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
