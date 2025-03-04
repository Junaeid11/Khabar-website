import { IMeal } from "@/types";
import {  createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IMeal {
  orderQuantity: number;
  stock: number

}

interface InitialState {
  products: CartProduct[];
  shippingAddress: string;
  dietaryPreferences: string;
  deliverySchedule: string;
}

const initialState: InitialState = {
  products: [],
  shippingAddress: "",
  dietaryPreferences: 'N/A',
  deliverySchedule: ""
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateDietary: (state, action) => {
      state.dietaryPreferences = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    updateDeliverySchedule: (state, action) => {
      state.deliverySchedule = action.payload || '';
    },
    clearCart: (state) => {
      state.products = [];
      state.dietaryPreferences = "";
      state.shippingAddress = "";
      state.deliverySchedule = "";
    },
  },
});

//* Products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      dietaryPreferences: state.cart.dietaryPreferences ,
      deliverySchedule: state.cart.deliverySchedule.toString(),
    })),
    shippingAddress: `${state.cart.shippingAddress} `,

    paymentMethod: "Online",
  };
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};
export const updateDietaryPreference = (state: RootState) => {
  return state.cart.dietaryPreferences || 'N/A';
};
export const updateDelivery = (state: RootState) => {
  return state.cart.deliverySchedule;
};
export const subTotalSelector = (state: RootState) =>
  state.cart.products.reduce((acc, product) => acc + product.price * product.orderQuantity, 0);

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateDietary,
  updateDeliverySchedule,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
