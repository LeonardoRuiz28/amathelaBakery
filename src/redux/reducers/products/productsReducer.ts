import { createReducer } from "@reduxjs/toolkit";
import { ICartProduct } from "../../../models/product";
import { setShopCartProduct, updateShopCart } from "./productsActions";

interface IProductsState {
  shopCart: ICartProduct[];
}

const initialState: IProductsState = {
  shopCart: [],
};

const productReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setShopCartProduct, (state, action) => {
      state.shopCart.push(action.payload);
    })
    .addCase(updateShopCart, (state, action) => {
      state.shopCart = action.payload;
    })
);

export default productReducer;
