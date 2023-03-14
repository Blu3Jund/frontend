import { Action, createReducer, on } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';
import { Item } from '../../shared/models/item.model';
import { Product } from '../../shared/models/product.model';

export interface State {
  product: Product;
  items: Item[];
  editedItemIndex: number;
}

const initialState: State = {
  product: new Product('1', '1', '1', null, null, null),
  items: [new Item('sku1', 9, 19.99, undefined, []), new Item('sku2', 9, 19.99, undefined, [])],
  editedItemIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.ADD_ITEM, (state, action) => ({
    ...state,
    items: state.items.concat(action.item),
  })),

  on(ShoppingListActions.ADD_ITEMS, (state, action) => ({
    ...state,
    product: action.product,
    items: state.items.concat(...action.items),
  })),

  on(ShoppingListActions.UPDATE_ITEM, (state, action) => ({
    ...state,
    editedItemIndex: -1,
    items: state.items.map((item, index) =>
      index === state.editedItemIndex ? { ...action.item } : item,
    ),
  })),

  on(ShoppingListActions.DELETE_ITEM, (state, action) => ({
    ...state,
    items: state.items.filter((_) => action.item !== _),
  })),

  on(ShoppingListActions.START_EDIT, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.STOP_EDIT, (state) => ({
    ...state,
    editIndex: -1,
  })),
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
