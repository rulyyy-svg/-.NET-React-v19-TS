import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav className="grid w-full grid-cols-5 border-b border-[#ccc]">
      <Link
        to={"/"}
        className="col-span-3 col-start-2 flex items-center justify-center"
      >
        <h1 className="h-[110px] w-full border-b border-[#ccc] bg-left bg-no-repeat py-[20px] [content:url('/public/padre_gino.svg')]">
          Padre Gino's Pizza
        </h1>
      </Link>
      <div className="col-start-5 flex items-center justify-center text-[40px]">
        🛒
        <span
          data-testid="cart-number"
          className="relative -top-[17px] -left-[17px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[18px] text-white"
        >
          {cart.length}
        </span>
      </div>
    </nav>
  );
}