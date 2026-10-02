import { render, cleanup } from "@testing-library/react";
import { expect, test, beforeEach } from "vitest";
import Header from "../Header";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import type { Pizza } from "../APIResponsesTypes";
import type { CartItem } from "../cartSlice";
import { Provider } from "react-redux";
import { makeStore } from "../store";

beforeEach(() => {
  cleanup();
});

const testPizza: Pizza = {
  id: "pepperoni",
  name: "The Pepperoni Pizza",
  category: "Classic",
  description: "Mozzarella Cheese, Pepperoni",
  image: "/public/pizzas/pepperoni.webp",
  sizes: { S: 9.75, M: 12.5, L: 15.25 },
};

const threeItems: CartItem[] = [
  { pizza: testPizza, size: "S", price: "$9.75" },
  { pizza: testPizza, size: "M", price: "$12.50" },
  { pizza: testPizza, size: "L", price: "$15.25" },
];

test("correctly renders a header with a zero cart count", async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <Provider store={makeStore()}>
        <Header />
      </Provider>
    ),
  });

  const router = createRouter({ routeTree: rootRoute });

  const screen = render(
    <RouterProvider router={router} />,
  );

  const itemsInCart = await screen.findByTestId("cart-number");

  expect(itemsInCart).toBeTruthy();
  expect(itemsInCart.textContent).toBe("0");
});

test("correctly renders a header with a three cart count", async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <Provider store={makeStore({ cart: { items: threeItems } })}>
        <Header />
      </Provider>
    ),
  });

  const router = createRouter({ routeTree: rootRoute });

  const screen = render(
    <RouterProvider router={router} />,
  );

  const itemsInCart = await screen.findByTestId("cart-number");

  expect(itemsInCart).toBeTruthy();
  expect(itemsInCart.textContent).toBe("3");
});