import { expect, test, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { usePizzaOfTheDay } from "../usePizzaOfTheDay";
import { makeStore } from "../store";

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

beforeEach(() => {
  fetchMocker.resetMocks();
});

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description:
    "Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
  image: "/public/pizzas/calabrese.webp",
  sizes: {
    S: 12.25,
    M: 16.25,
    L: 20.25,
  },
};

function createWrapper() {
  const store = makeStore();

  return function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

test("to be null on initial load", () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay(), {
    wrapper: createWrapper(),
  });

  expect(result.current).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });

  const request = fetchMocker.mock.calls[0]?.[0];

  expect(request).toBeInstanceOf(Request);

  if (!(request instanceof Request)) {
    throw new Error("Expected fetch to receive a Request");
  }

  expect(request.url).toContain("/api/pizza-of-the-day");
  expect(request.method).toBe("GET");
});