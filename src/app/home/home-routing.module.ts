import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id',
        component: HomeDetailsComponent,
        // resolve: [HomeResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
