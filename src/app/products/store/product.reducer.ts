import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './product.actions';
import { Product } from '../../shared/models/product.model';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

const _productReducer = createReducer(
  initialState,

  on(ProductsActions.ADD_PRODUCT, (state, action) => ({
    ...state,
    products: state.products.concat({ ...action.product }),
  })),

  on(ProductsActions.UPDATE_PRODUCT, (state, action) => ({
    ...state,
    products: state.products.map((product, index) =>
      index === action.index ? { ...action.product } : product,
    ),
  })),

  on(ProductsActions.DELETE_PRODUCT, (state, action) => ({
    ...state,
    products: state.products.filter((_, index) => index !== action.index),
  })),

  on(ProductsActions.SET_PRODUCTS, (state, action) => ({
    ...state,
    products: [...action.products],
  })),
);

export function productReducer(state: State, action: Action) {
  return _productReducer(state, action);
}
