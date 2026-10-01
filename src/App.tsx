import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { CartContext, type CartItem } from "./contexts"; 

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const App = () => {
  const cartHook = useState<CartItem[]>([]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider value={cartHook}>
          <RouterProvider router={router} />
        </CartContext.Provider>
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);

export default App;