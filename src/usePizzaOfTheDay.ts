import { useDebugValue } from "react";
import { useGetPizzaOfTheDayQuery } from "./api/pizzaApi";
import type { Pizza } from "./APIResponsesTypes";

export const usePizzaOfTheDay = (): Pizza | null => {
  const { data: pizzaOfTheDay } = useGetPizzaOfTheDayQuery();

  useDebugValue(
    pizzaOfTheDay ? pizzaOfTheDay.name : "Loading...",
  );

  return pizzaOfTheDay ?? null;
};