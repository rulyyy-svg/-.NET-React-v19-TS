import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";
import type { CartItem } from "../contexts";

test("snapshot with nothing in cart", () => {
  const emptyCart: CartItem[] = [];
  const screen = render(<Cart cart={emptyCart} checkout={() => {}} />);
  expect(screen.asFragment()).toMatchSnapshot();
});

test("snapshot with some stuff in cart", () => {
  const emptyCart: CartItem[] = [];
  const screen = render(<Cart cart={emptyCart} checkout={() => {}} />);
  expect(screen.asFragment()).toMatchSnapshot();
});