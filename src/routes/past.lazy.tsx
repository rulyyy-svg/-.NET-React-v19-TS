import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetPastOrderQuery, useGetPastOrdersQuery } from "../api/pizzaApi";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// both tables (list + modal) share the same look
const tableClass =
  "my-6.25 w-full border-collapse border border-[#ddd] font-[sans-serif] text-[0.9em] sm:min-w-100";
const headRowClass = "bg-secondary text-left text-white";
const bodyRowClass =
  "border-b border-[#ddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary";
const cellClass = "px-3.75 py-3 text-center";

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState<number>();
  // currentData = data for *this* page only (data would still hold the previous page)
  const { currentData: data, isFetching } = useGetPastOrdersQuery(page);

  const { data: pastOrderData } = useGetPastOrderQuery(
    focusedOrder ?? skipToken,
  );

  if (isFetching && !data) {
    return (
      <div className="mx-auto min-h-162.5 w-[90%] max-w-225">
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (!data) {
    throw new Error("Past orders could not be loaded");
  }

  return (
    <div className="mx-auto min-h-162.5 w-[90%] max-w-225">
      <table className={tableClass}>
        <thead>
          <tr className={headRowClass}>
            <td className={cellClass}>ID</td>
            <td className={cellClass}>Date</td>
            <td className={cellClass}>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id} className={bodyRowClass}>
              <td className={cellClass}>
                <button
                  className="btn"
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  {order.order_id}
                </button>
              </td>
              <td className={cellClass}>{order.date}</td>
              <td className={cellClass}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <div className="font-pacifico text-[20px] text-primary">{page}</div>
        <button
          className="btn"
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {pastOrderData ? (
            <table className={tableClass}>
              <thead>
                <tr className={headRowClass}>
                  <td className={cellClass}>Image</td>
                  <td className={cellClass}>Name</td>
                  <td className={cellClass}>Size</td>
                  <td className={cellClass}>Quantity</td>
                  <td className={cellClass}>Price</td>
                  <td className={cellClass}>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr
                    key={`${pizza.pizzaTypeId}_${pizza.size}`}
                    className={bodyRowClass}
                  >
                    <td className={cellClass}>
                      <img
                        className="w-12.5"
                        src={pizza.image}
                        alt={pizza.name}
                      />
                    </td>
                    <td className={cellClass}>{pizza.name}</td>
                    <td className={cellClass}>{pizza.size}</td>
                    <td className={cellClass}>{pizza.quantity}</td>
                    <td className={cellClass}>{intl.format(pizza.price)}</td>
                    <td className={cellClass}>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button className="btn" onClick={() => setFocusedOrder(undefined)}>
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
