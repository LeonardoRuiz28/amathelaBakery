import { createAction } from "@reduxjs/toolkit";
import { ICartProduct } from "../../../models/product";

export const setShopCartProduct = createAction<ICartProduct>(
  "SET_SHOP_CART_PRODUCT"
);

export const updateShopCart = createAction<ICartProduct[]>(
    "UPDATE_SHOP_CART_PRODUCT"
  );
  

