import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { CartItem } from "../cartSlice";
import type {
  PastOrder,
  PastOrderDetail,
  Pizza,
} from "../APIResponsesTypes";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  tagTypes: ["PastOrders"],

  endpoints: (build) => ({
    getPizzas: build.query<Pizza[], void>({
      query: () => "pizzas",
    }),

    getPizzaOfTheDay: build.query<Pizza, void>({
      query: () => "pizza-of-the-day",
    }),

    getPastOrder: build.query<PastOrderDetail, number>({
      query: (order) => `past-order/${order}`,
      keepUnusedDataFor: 24 * 60 * 60,
    }),

    getPastOrders: build.query<PastOrder[], number>({
      query: (page) => `past-orders?page=${page}`,
      providesTags: ["PastOrders"],
    }),

    placeOrder: build.mutation<unknown, CartItem[]>({
      query: (cart) => ({
        url: "order",
        method: "POST",
        body: { cart },
      }),
      invalidatesTags: ["PastOrders"],
    }),

    postContact: build.mutation<unknown, ContactMessage>({
      query: (contact) => ({
        url: "contact",
        method: "POST",
        body: contact,
      }),
    }),
  }),
});

export const {
  useGetPizzasQuery,
  useGetPizzaOfTheDayQuery,
  useGetPastOrderQuery,
  useGetPastOrdersQuery,
  usePlaceOrderMutation,
  usePostContactMutation,
} = pizzaApi;