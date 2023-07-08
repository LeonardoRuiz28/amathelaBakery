import { createReducer } from "@reduxjs/toolkit";
import { setProducts } from "./productsActions";

interface IProductsState {
  product: string;
}

const initialState: IProductsState = {
  product: "",
};

createReducer(initialState, (builder) =>
  builder.addCase(setProducts, (state, action) => {
    state.product = action.payload;
  })
);
