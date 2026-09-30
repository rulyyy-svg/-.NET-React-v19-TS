import { expect, test } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Pizza from "../Pizza";

test("renders pizza with image", () => {
  cleanup(); // Clean DOM
  const name = "The Pepperoni Pizza";
  const description = "Mozzarella Cheese, Pepperoni";
  const src = "/public/pizzas/pepperoni.webp";

  const screen = render(
    <Pizza name={name} description={description} image={src} />,
  );

  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img.getAttribute("src")).toBe(src);
  expect(img.alt).toBe(name);
});

test("renders pizza with default image if none provided", () => {
  cleanup(); // Clean DOM
  const name = "The Pepperoni Pizza";
  const description = "Mozzarella Cheese, Pepperoni";

  const screen = render(<Pizza name={name} description={description} />);

  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img.getAttribute("src")).not.toBe("");
  expect(img.getAttribute("src")).toContain("https://picsum.photos");
});