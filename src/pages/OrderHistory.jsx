import React from "react";
import "./Orders.css";

export default function OrderHistory() {
  const orders = [
    { id: 103, product: "Headphones", price: 2000, date: "08 Oct 2026" },
    { id: 105, product: "Keyboard", price: 1500, date: "06 Oct 2026" },
  ];

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      <p>View your previously delivered orders.</p>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <span className="order-id">Order #{order.id}</span>
            <span className="status delivered">Delivered</span>

            <h3>{order.product}</h3>
            <p>Order Date: {order.date}</p>
            <p>Price: ₹{order.price.toLocaleString("en-IN")}</p>

            <button
              className="order-btn"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}