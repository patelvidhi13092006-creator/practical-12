import React from "react";
import "./Orders.css";

export default function CancelledOrders() {
  const orders = [
    {
      id: 104,
      product: "Smart Watch",
      price: 5000,
      reason: "Cancelled by customer",
      refund: "Refund pending",
    },
  ];

  return (
    <div className="orders-page">
      <h2>Cancelled Orders</h2>
      <p>Check cancelled orders and their refund status.</p>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <span className="order-id">Order #{order.id}</span>
            <span className="status cancelled">Cancelled</span>

            <h3>{order.product}</h3>
            <p>Price: ₹{order.price.toLocaleString("en-IN")}</p>
            <p>Reason: {order.reason}</p>
            <p>Refund: {order.refund}</p>

            <button
              className="order-btn"
              onClick={() => alert(`Reordering ${order.product}`)}
            >
              Reorder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}