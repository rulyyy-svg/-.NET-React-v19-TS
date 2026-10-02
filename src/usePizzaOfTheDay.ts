import { useDebugValue } from "react";
import { useGetPizzaOfTheDayQuery } from "./api/pizzaApi";

export const usePizzaOfTheDay = () => {
  const { data } = useGetPizzaOfTheDayQuery();
  const pizzaOfTheDay = data ?? null;

  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  return pizzaOfTheDay;
};
