import { NavLink, Outlet } from "react-router-dom";

function Orders() {
  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Order Management</h1>
        <p>Manage and track all your orders in one place.</p>
      </header>

      <nav className="orders-nav">
        <NavLink to="current">Current Orders</NavLink>
        <NavLink to="history">Order History</NavLink>
        <NavLink to="cancelled">Cancelled Orders</NavLink>
      </nav>

      <main className="orders-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Orders;