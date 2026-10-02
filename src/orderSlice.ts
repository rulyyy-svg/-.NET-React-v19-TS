import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PizzaSize } from "./APIResponsesTypes";

type OrderState = {
  pizzaType: string;
  pizzaSize: PizzaSize;
};

const initialState: OrderState = {
  pizzaType: "pepperoni",
  pizzaSize: "M",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPizzaType: (state, action: PayloadAction<string>) => {
      state.pizzaType = action.payload;
    },

    setPizzaSize: (state, action: PayloadAction<PizzaSize>) => {
      state.pizzaSize = action.payload;
    },
  },
});

export const { setPizzaType, setPizzaSize } = orderSlice.actions;

export const selectPizzaType = (state: {
  order: OrderState;
}) => state.order.pizzaType;

export const selectPizzaSize = (state: {
  order: OrderState;
}) => state.order.pizzaSize;