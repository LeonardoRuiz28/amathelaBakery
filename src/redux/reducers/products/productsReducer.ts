import { createReducer } from "@reduxjs/toolkit";
import { setProducts } from "./productsActions";

interface IProductsState {
  product: string;
}

const initialState: IProductsState = {
  product: "",
};

const productReducer = createReducer(initialState, (builder) =>
  builder.addCase(setProducts, (state, action) => {
    state.product = action.payload;
  })
);

export default productReducer