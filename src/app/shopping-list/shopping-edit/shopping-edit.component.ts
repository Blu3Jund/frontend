import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Item } from '../../shared/models/item.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Item;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((stateData) => {
      const index = stateData.editedItemIndex;
      if (index > -1) {
        this.editMode = true;
        this.editedItem = stateData.items[index];
        this.slForm.setValue({
          sku: this.editedItem.sku,
          quantity_in_stock: this.editedItem.quantity_in_stock,
          price: this.editedItem.price,
          image_url: this.editedItem.image_url,
          variations: this.editedItem.variations,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const item = new Item(
      value.sku,
      value.quantity_in_stock,
      value.price,
      value.upload,
      value.variations,
    );
    if (this.editMode) {
      this.store.dispatch(ShoppingListActions.UPDATE_ITEM({ item }));
    } else {
      this.store.dispatch(ShoppingListActions.ADD_ITEM({ item }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.STOP_EDIT());
  }

  // onDelete() {
  //   this.store.dispatch(ShoppingListActions.DELETE_ITEM());
  //   this.onClear();
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.STOP_EDIT());
  }
}
