import { useState } from "react";
import { useQuery, skipToken } from "@tanstack/react-query";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";

export function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState<number>();

  // Inference otomatis: useQuery tahu data bertipe PastOrder[] | undefined
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
  });

  // Penggunaan skipToken: Menggantikan enabled & menghilangkan kebutuhan non-null assertion (!)
  const { data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: focusedOrder ? () => getPastOrder(focusedOrder) : skipToken,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (!data) {
    throw new Error("Past orders could not be loaded");
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {pastOrderData ? (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}-${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{pizza.price}</td>
                    <td>{pizza.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button onClick={() => setFocusedOrder(undefined)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}