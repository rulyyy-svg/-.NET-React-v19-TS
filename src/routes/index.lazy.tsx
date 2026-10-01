import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <div className="mx-auto my-30 grid max-w-[700px] grid-cols-1 gap-7.5 sm:grid-cols-2">
      <div className="flex flex-col">
        <h1 className="font-pacifico font-normal text-[2em] text-primary">Padre Gino's</h1>
        <p className="max-w-[315px] text-[40px] font-bold uppercase text-secondary">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center">
        <li className="w-full max-w-[250px] text-center">
          <Link to="/order" className="btn mb-2.5 block w-full">
            Order
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link to="/past" className="btn mb-2.5 block w-full">
            Past Orders
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link to="/contact" className="btn mb-2.5 block w-full">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default IndexRoute;