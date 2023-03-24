import { createAction, props } from '@ngrx/store';
import { Item } from '../../shared/models/item.model';
import { Product } from '../../shared/models/product.model';
import { Order } from '../../shared/models/order.model';

export const ADD_ITEM = createAction(
  '[Shopping List] Add Item',
  props<{
    item: Item;
  }>(),
);

export const ADD_ITEMS = createAction(
  '[Shopping List] Add Items',
  props<{
    product: Product;
    items: Item[];
  }>(),
);

export const UPDATE_ITEM = createAction(
  '[Shopping List] Update Item',
  props<{
    item: Item;
  }>(),
);

export const DELETE_ITEM = createAction(
  '[Shopping List] Delete Item',
  props<{
    item: Item;
  }>(),
);

export const START_EDIT = createAction(
  '[Shopping List] Start Edit',
  props<{
    index: number;
  }>(),
);

export const STOP_EDIT = createAction('[Shopping List] Stop Edit');

export const ADD_ORDER = createAction(
  '[Shopping List] Add Order',
  props<{
    items: Item[];
    email: string;
  }>(),
);

export const FETCH_ORDERS = createAction('[Shopping List] Fetch Orders');

export const SET_ORDERS = createAction(
  '[Shopping List] Set Orders',
  props<{
    orders: Order[];
  }>(),
);
