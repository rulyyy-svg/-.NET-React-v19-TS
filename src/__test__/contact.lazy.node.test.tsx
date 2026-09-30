import { expect, test, vi, beforeEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

beforeEach(() => {
  cleanup();
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

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <ContactRoute />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
  const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
  const msgTextArea = screen.getByPlaceholderText(
    "Message",
  ) as HTMLTextAreaElement;

  fireEvent.change(nameInput, { target: { value: "Test User" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(msgTextArea, { target: { value: "Hello world" } });

  const submitBtn = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
  });
});