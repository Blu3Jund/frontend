import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';

export const ADD_PRODUCT = createAction(
  '[Product] Add Product',
  props<{
    product: Product;
  }>(),
);

export const UPDATE_PRODUCT = createAction(
  '[Product] Update Product',
  props<{
    index: number;
    product: Product;
  }>(),
);

export const DELETE_PRODUCT = createAction(
  '[Product] Delete Product',
  props<{
    index: number;
  }>(),
);

export const SET_PRODUCTS = createAction(
  '[Product] Set Products',
  props<{
    products: Product[];
  }>(),
);

export const FETCH_PRODUCTS = createAction('[Product] Fetch Products');

export const STORE_PRODUCTS = createAction('[Product] Store Products');
export const MOCK_PRODUCTS = createAction('[Product] Mock Products');
export const DELETE_PRODUCTS = createAction('[Product] Delete Products');
