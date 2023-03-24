import { Action, createReducer, on } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';
import { Item } from '../../shared/models/item.model';
import { Order } from '../../shared/models/order.model';

export interface State {
  items: Item[];
  editedItemIndex: number;
  order: { email: string; items: Item[] };
  orders: Order[];
}

const initialState: State = {
  items: [],
  editedItemIndex: -1,
  order: { email: '', items: [] },
  orders: [],
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
  on(ShoppingListActions.ADD_ORDER, (state, action) => ({
    ...state,
    order: {
      email: action.email,
      items: action.items,
    },
  })),
  on(ShoppingListActions.SET_ORDERS, (state, action) => ({
    ...state,
    orders: [...action.orders],
  })),
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}
