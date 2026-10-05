import { expect, test, vi, beforeEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { Route } from "../routes/contact.lazy";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store";

function createWrapper() {
  const store = makeStore();

  return function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

beforeEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("can submit contact form", async () => {
  const fetchMock = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    }),
  );

  vi.stubGlobal("fetch", fetchMock);

  const ContactRoute = Route.options.component;

  if (!ContactRoute) {
    throw new Error("contact route has no component");
  }

  const screen = render(<ContactRoute />, {
    wrapper: createWrapper(),
  });

  const nameInput = screen.getByPlaceholderText(
    "Name",
  ) as HTMLInputElement;

  const emailInput = screen.getByPlaceholderText(
    "Email",
  ) as HTMLInputElement;

  const msgTextArea = screen.getByPlaceholderText(
    "Message",
  ) as HTMLTextAreaElement;

  fireEvent.change(nameInput, {
    target: { value: "Test User" },
  });

  fireEvent.change(emailInput, {
    target: { value: "test@example.com" },
  });

  fireEvent.change(msgTextArea, {
    target: { value: "Hello world" },
  });

  const submitBtn = screen.getByRole("button", {
    name: /submit/i,
  });

  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
  });

  const requestValue: unknown = fetchMock.mock.calls[0]?.[0];

  expect(requestValue).toBeInstanceOf(Request);

  if (!(requestValue instanceof Request)) {
    throw new Error("Expected fetch to receive a Request");
  }

  expect(requestValue.url).toContain("/api/contact");
  expect(requestValue.method).toBe("POST");

  expect(requestValue.headers.get("Content-Type")).toContain(
    "application/json",
  );

  const body: unknown = await requestValue.json();

  expect(body).toEqual({
    name: "Test User",
    email: "test@example.com",
    message: "Hello world",
  });
});