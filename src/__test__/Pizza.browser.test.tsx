import { render, cleanup } from "@testing-library/react";
import { expect, test, beforeEach } from "vitest";
import Pizza from "../Pizza";

beforeEach(() => {
  cleanup();
});

test("alt text renders on image", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img") as HTMLImageElement;

  expect(img).toBeTruthy();
  expect(img.getAttribute("src")).toBe(src);
  expect(img.getAttribute("alt")).toBe(name);
});