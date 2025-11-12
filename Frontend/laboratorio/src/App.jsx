import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import CustomerList from "./components/CustomerList";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import CustomerSearch from "./components/CustomerSearch";
import SalesReport from "./components/SalesReport";

const App = () => {
  const navStyle = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    marginBottom: "20px",
  };

  const linkStyle = {
    marginRight: "15px",
    textDecoration: "none",
    color: "#646cff",
    fontWeight: "bold",
  };

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/protected" style={linkStyle}>Protected</Link>
        <Link to="/customers" style={linkStyle}>Clientes (Ej.2)</Link>
        <Link to="/sale-form" style={linkStyle}>Nueva Venta (Ej.3)</Link>
        <Link to="/sales" style={linkStyle}>Ventas (Ej.4)</Link>
        <Link to="/customer-search" style={linkStyle}>Buscar Cliente (Ej.5)</Link>
        <Link to="/sales-report" style={linkStyle}>Reporte (Ej.6)</Link>
      </nav>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sale-form" element={<SaleForm />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/customer-search" element={<CustomerSearch />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/" element={
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h1>Laboratorio X - Programación Web</h1>
            <p>Selecciona una opción del menú</p>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;