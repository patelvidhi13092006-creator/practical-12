import React from "react";
import "./Orders.css";

export default function CurrentOrders() {
  const orders = [
    { id: 101, product: "Laptop", price: 55000, status: "Processing", progress: 30 },
    { id: 102, product: "Smartphone", price: 25000, status: "Shipped", progress: 70 },
  ];

  return (
    <div className="orders-page">
      <h2>Current Orders</h2>
      <p>Track your active orders and delivery progress.</p>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <span className="order-id">Order #{order.id}</span>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>

            <h3>{order.product}</h3>
            <p>Price: ₹{order.price.toLocaleString("en-IN")}</p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${order.progress}%` }}
              />
            </div>
            <p>Delivery progress: {order.progress}%</p>

            <button
              className="order-btn"
              onClick={() => alert(`Tracking order #${order.id}`)}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}