import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  Outlet,
} from "react-router-dom";

const initialOrders = [
  {
    id: 101,
    product: "Laptop",
    date: "10 Oct 2026",
    price: 55000,
    status: "Processing",
    delivery: "15 Oct 2026",
    progress: 30,
    reason: "",
    refund: "Not applicable",
  },
  {
    id: 102,
    product: "Smartphone",
    date: "09 Oct 2026",
    price: 25000,
    status: "Shipped",
    delivery: "13 Oct 2026",
    progress: 70,
    reason: "",
    refund: "Not applicable",
  },
  {
    id: 103,
    product: "Headphones",
    date: "08 Oct 2026",
    price: 2000,
    status: "Delivered",
    delivery: "11 Oct 2026",
    progress: 100,
    reason: "",
    refund: "Not applicable",
  },
  {
    id: 104,
    product: "Smart Watch",
    date: "07 Oct 2026",
    price: 5000,
    status: "Cancelled",
    delivery: "Cancelled",
    progress: 0,
    reason: "Cancelled by customer",
    refund: "Refund pending",
  },
  {
    id: 105,
    product: "Keyboard",
    date: "06 Oct 2026",
    price: 1500,
    status: "Delivered",
    delivery: "10 Oct 2026",
    progress: 100,
    reason: "",
    refund: "Not applicable",
  },
];

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f6fc;
  color: #252943;
}

button, input { font-family: inherit; }

.header {
  background: linear-gradient(135deg, #5146e5, #8176ff);
  color: white;
  padding: 25px 7%;
}

.header h1 { margin-bottom: 8px; }

.container {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 20px;
}

.welcome { margin-bottom: 25px; }
.welcome h2 { margin-bottom: 8px; }
.welcome p { color: #777d93; line-height: 1.6; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 28px;
}

.stat-card {
  background: white;
  padding: 22px;
  border: 1px solid #e8eaf3;
  border-radius: 14px;
  box-shadow: 0 5px 18px #25294308;
  transition: .25s;
}

.stat-card:hover { transform: translateY(-4px); }
.stat-card p { color: #777d93; margin-bottom: 12px; }
.stat-card h2 { color: #5146e5; font-size: 29px; }

.orders-box {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 20px #25294308;
}

.orders-box > h2 { margin-bottom: 20px; }

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #e8eaf2;
  margin-bottom: 25px;
}

.tabs a {
  text-decoration: none;
  color: #777d93;
  padding: 13px 15px;
  border-radius: 9px 9px 0 0;
  font-weight: bold;
  font-size: 14px;
}

.tabs a:hover, .tabs a.active {
  color: #5146e5;
  background: #f0efff;
}

.tabs a.active { border-bottom: 3px solid #5146e5; }

.page-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.page-title h3 { margin-bottom: 7px; }
.page-title p { color: #858ba0; font-size: 14px; }

.count-label {
  background: #f0efff;
  color: #5146e5;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: bold;
}

.search {
  width: 100%;
  padding: 13px 15px;
  margin-bottom: 20px;
  border: 1px solid #dfe2ee;
  border-radius: 9px;
  outline: none;
  font-size: 14px;
}

.search:focus {
  border-color: #5146e5;
  box-shadow: 0 0 0 3px #5146e51a;
}

.order-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.order-card {
  padding: 21px;
  border: 1px solid #e8eaf3;
  border-radius: 13px;
  transition: .25s;
  background: white;
}

.order-card:hover {
  border-color: #b9b4ff;
  transform: translateY(-3px);
  box-shadow: 0 8px 22px #2529430c;
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 17px;
}

.order-id { color: #5146e5; font-size: 13px; font-weight: bold; }
.order-card h3 { margin-bottom: 13px; font-size: 19px; }

.order-info {
  color: #777d93;
  font-size: 14px;
  line-height: 2;
}

.price { font-size: 22px; font-weight: bold; margin-top: 15px; }

.badge {
  display: inline-block;
  padding: 7px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
}

.processing { color: #996600; background: #fff1c9; }
.shipped { color: #2168c4; background: #e1efff; }
.delivered { color: #168653; background: #dff7e9; }
.cancelled { color: #d43c4c; background: #ffe5e8; }

.progress-heading {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 9px;
  font-size: 12px;
  color: #777d93;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: #e9eaf3;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5146e5, #8176ff);
  border-radius: 10px;
  transition: width .4s;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 19px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 10px 13px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: .2s;
}

.btn:hover { opacity: .85; transform: translateY(-1px); }
.btn-primary { background: #5146e5; color: white; }
.btn-secondary { background: #efefff; color: #5146e5; }
.btn-danger { background: #ffe8eb; color: #cf3448; }

.details-panel {
  margin-top: 15px;
  padding: 13px;
  border-radius: 9px;
  background: #f7f7ff;
  font-size: 13px;
  line-height: 1.9;
}

.details-panel h4 { margin-bottom: 5px; }

.refund-box {
  margin-top: 15px;
  padding: 12px;
  border-radius: 9px;
  background: #fff5e5;
  color: #966000;
  font-size: 13px;
}

.empty {
  padding: 35px 10px;
  text-align: center;
  color: #777d93;
}

.notice {
  margin-bottom: 18px;
  padding: 12px 15px;
  background: #e4f8eb;
  color: #167345;
  border-radius: 9px;
  font-size: 14px;
}

.footer {
  text-align: center;
  color: #858ba0;
  padding: 30px 15px;
  font-size: 13px;
}

@media (max-width: 700px) {
  .header { padding: 22px 5%; }
  .container { margin: 22px auto; padding: 0 12px; }
  .stats { grid-template-columns: 1fr; gap: 12px; }
  .orders-box { padding: 16px; }
  .tabs { gap: 4px; }
  .tabs a { padding: 11px 9px; font-size: 12px; }
  .order-list { grid-template-columns: 1fr; }
}
`;

function OrdersLayout({ orders }) {
  return (
    <div className="app">
      <style>{styles}</style>

      <header className="header">
        <h1>🛍️ ShopSphere</h1>
        <p>E-commerce Order Management System</p>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Order Management Dashboard</h2>
          <p>Manage, track and review your orders in one place.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <p>Current Orders</p>
            <h2>{orders.filter(o =>
              ["Processing", "Shipped"].includes(o.status)
            ).length}</h2>
          </div>

          <div className="stat-card">
            <p>Order History</p>
            <h2>{orders.filter(o => o.status === "Delivered").length}</h2>
          </div>

          <div className="stat-card">
            <p>Cancelled Orders</p>
            <h2>{orders.filter(o => o.status === "Cancelled").length}</h2>
          </div>
        </section>

        <section className="orders-box">
          <h2>📦 My Orders</h2>
          <nav className="tabs">
            <NavLink to="current">Current Orders</NavLink>
            <NavLink to="history">Order History</NavLink>
            <NavLink to="cancelled">Cancelled Orders</NavLink>
          </nav>
          <Outlet />
        </section>
      </main>

      <footer className="footer">
        © 2026 ShopSphere | E-commerce Order Management
      </footer>
    </div>
  );
}

function OrderList({ type, orders, onCancel, onReorder }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [message, setMessage] = useState("");

  const titles = {
    current: "Current Orders",
    history: "Order History",
    cancelled: "Cancelled Orders",
  };

  const filtered = orders.filter(order => {
    const matchesType =
      type === "current"
        ? ["Processing", "Shipped"].includes(order.status)
        : type === "history"
          ? order.status === "Delivered"
          : order.status === "Cancelled";

    const term = search.trim().toLowerCase();
    return matchesType && (
      order.product.toLowerCase().includes(term) ||
      String(order.id).includes(term)
    );
  });

  function handleCancel(order) {
    const confirmed = window.confirm(
      `Cancel order #${order.id} (${order.product})?`
    );

    if (confirmed) {
      onCancel(order.id);
      setMessage(`Order #${order.id} has been cancelled.`);
    }
  }

  function handleReorder(order) {
    onReorder(order);
    setMessage(`${order.product} has been added back as a new order.`);
  }

  function showDetails(order) {
    setExpanded(expanded === order.id ? null : order.id);
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>{titles[type]}</h3>
          <p>Search and manage your orders below.</p>
        </div>
        <span className="count-label">{filtered.length} Orders</span>
      </div>

      {message && (
        <div className="notice" role="status">
          {message}
        </div>
      )}

      <input
        className="search"
        type="search"
        placeholder="Search product or order ID..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      {filtered.length > 0 ? (
        <div className="order-list">
          {filtered.map(order => (
            <article className="order-card" key={order.id}>
              <div className="order-top">
                <span className="order-id">ORDER #{order.id}</span>
                <span className={`badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <h3>📦 {order.product}</h3>

              <div className="order-info">
                <p>📅 Order Date: {order.date}</p>
                <p>🚚 {type === "current" ? "Expected Delivery" : "Delivery"}: {order.delivery}</p>
              </div>

              <div className="price">
                ₹{order.price.toLocaleString("en-IN")}
              </div>

              {type === "current" && (
                <>
                  <div className="progress-heading">
                    <span>Delivery progress</span>
                    <strong>{order.progress}%</strong>
                  </div>
                  <div
                    className="progress-track"
                    aria-label={`Delivery progress ${order.progress}%`}
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </>
              )}

              {type === "cancelled" && (
                <div className="refund-box">
                  <strong>Cancellation reason:</strong> {order.reason || "Not provided"}
                  <p style={{ marginTop: 7 }}>
                    <strong>Refund status:</strong> {order.refund}
                  </p>
                </div>
              )}

              <div className="action-buttons">
                {type === "current" && (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => showDetails(order)}
                    >
                      {expanded === order.id ? "Hide Details" : "Track Order"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(order)}
                      disabled={order.status === "Shipped"}
                      title={order.status === "Shipped" ? "Shipped orders cannot be cancelled in this demo" : ""}
                    >
                      Cancel Order
                    </button>
                  </>
                )}

                {type === "history" && (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => showDetails(order)}
                    >
                      {expanded === order.id ? "Hide Details" : "View Details"}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => window.print()}
                    >
                      Print Receipt
                    </button>
                  </>
                )}

                {type === "cancelled" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>
                )}
              </div>

              {expanded === order.id && (
                <div className="details-panel">
                  <h4>Order Details</h4>
                  <p>Order number: #{order.id}</p>
                  <p>Product: {order.product}</p>
                  <p>Order date: {order.date}</p>
                  <p>Order status: {order.status}</p>
                  <p>Amount: ₹{order.price.toLocaleString("en-IN")}</p>
                  {type === "current" && (
                    <p>Expected delivery: {order.delivery}</p>
                  )}
                  <p>Payment: Demo payment information</p>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No orders found!</h3>
          <p>Try another product name or order ID.</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [orderData, setOrderData] = useState(initialOrders);

  function cancelOrder(id) {
    setOrderData(previous =>
      previous.map(order =>
        order.id === id
          ? {
              ...order,
              status: "Cancelled",
              progress: 0,
              delivery: "Cancelled",
              reason: "Cancelled by customer",
              refund: "Refund pending",
            }
          : order
      )
    );
  }

  function reorder(oldOrder) {
    setOrderData(previous => [
      {
        ...oldOrder,
        id: Math.max(...previous.map(o => o.id), 100) + 1,
        date: "11 Oct 2026",
        status: "Processing",
        delivery: "16 Oct 2026",
        progress: 10,
        reason: "",
        refund: "Not applicable",
      },
      ...previous,
    ]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/orders/current" replace />}
        />

        <Route
          path="/orders"
          element={<OrdersLayout orders={orderData} />}
        >
          <Route index element={<Navigate to="current" replace />} />
          <Route
            path="current"
            element={
              <OrderList
                type="current"
                orders={orderData}
                onCancel={cancelOrder}
                onReorder={reorder}
              />
            }
          />
          <Route
            path="history"
            element={
              <OrderList
                type="history"
                orders={orderData}
                onCancel={cancelOrder}
                onReorder={reorder}
              />
            }
          />
          <Route
            path="cancelled"
            element={
              <OrderList
                type="cancelled"
                orders={orderData}
                onCancel={cancelOrder}
                onReorder={reorder}
              />
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/orders/current" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}