import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Header />
          <Outlet />
          <PizzaOfTheDay />
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">404 - Halaman Tidak Ditemukan</h2>
        <p className="mt-2 text-gray-600">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link to="/" className="btn mt-4 inline-block">
          Kembali ke Beranda
        </Link>
      </div>
    );
  },
});