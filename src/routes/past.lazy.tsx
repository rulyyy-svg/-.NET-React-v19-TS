import { useState } from "react";

import { createLazyFileRoute } from "@tanstack/react-router";

import Modal from "../Modal";

import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  useGetPastOrderQuery,
  useGetPastOrdersQuery,
} from "../api/pizzaApi";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Helper class styling tabel
const tableClass =
  "w-full min-w-[400px] border-collapse border border-[#dddddd] font-sans text-[0.9em]";
const theadTrClass = "bg-secondary text-white text-left";
const thTdClass = "p-3 text-center";
const tbodyTrClass =
  "border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary";

function PastOrdersRoute() {
  const [page, setPage] = useState(1);

  const [focusedOrder, setFocusedOrder] = useState<number | undefined>(
    undefined,
  );

  const { data, isLoading, isError } = useGetPastOrdersQuery(page);

  const { data: pastOrderData } = useGetPastOrderQuery(
    focusedOrder ?? skipToken,
  );

  if (isLoading) {
    return (
      <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (isError || !data) {
    throw new Error("Past orders could not be loaded");
  }

  return (
    <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
      {/* Wrapper overflow-x-auto */}
      <div className="w-full overflow-x-auto">
        <table className={tableClass}>
          <thead>
            <tr className={theadTrClass}>
              <td className={thTdClass}>ID</td>
              <td className={thTdClass}>Date</td>
              <td className={thTdClass}>Time</td>
            </tr>
          </thead>

          <tbody>
            {data.map((order) => (
              <tr key={order.order_id} className={tbodyTrClass}>
                <td className={thTdClass}>
                  <button
                    className="btn"
                    onClick={() => setFocusedOrder(order.order_id)}
                  >
                    {order.order_id}
                  </button>
                </td>

                <td className={thTdClass}>{order.date}</td>

                <td className={thTdClass}>{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-4 flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        <div className="font-serif text-[20px] text-primary">{page}</div>

        <button
          className="btn"
          disabled={data.length < 10}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal Detail Order */}
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>

          {pastOrderData ? (
            <div className="w-full overflow-x-auto">
              <table className={tableClass}>
                <thead>
                  <tr className={theadTrClass}>
                    <td className={thTdClass}>Image</td>
                    <td className={thTdClass}>Name</td>
                    <td className={thTdClass}>Size</td>
                    <td className={thTdClass}>Quantity</td>
                    <td className={thTdClass}>Price</td>
                    <td className={thTdClass}>Total</td>
                  </tr>
                </thead>

                <tbody>
                  {pastOrderData.orderItems.map((pizza) => (
                    <tr
                      key={`${pizza.pizzaTypeId}_${pizza.size}`}
                      className={tbodyTrClass}
                    >
                      <td className={thTdClass}>
                        <img
                          className="mx-auto w-[50px]"
                          src={pizza.image}
                          alt={pizza.name}
                        />
                      </td>

                      <td className={thTdClass}>{pizza.name}</td>

                      <td className={thTdClass}>{pizza.size}</td>

                      <td className={thTdClass}>{pizza.quantity}</td>

                      <td className={thTdClass}>
                        {intl.format(pizza.price)}
                      </td>

                      <td className={thTdClass}>
                        {intl.format(pizza.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading …</p>
          )}

          <button
            className="btn mt-4"
            onClick={() => setFocusedOrder(undefined)}
          >
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}

export default PastOrdersRoute;