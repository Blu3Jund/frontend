import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
// import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component.ts.old';
import * as fromShoppingList from './store/shopping-list.reducer';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    StoreModule.forFeature('shoppingList', fromShoppingList.shoppingListReducer),
    SharedModule,
  ],
})
export class ShoppingListModule {}
