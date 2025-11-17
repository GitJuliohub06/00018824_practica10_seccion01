import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import CustomerList from "./components/CustomerList";
import CustomerManager from "./components/CustomerManager";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import CustomerSearch from "./components/CustomerSearch";
import SalesReport from "./components/SalesReport";

const App = () => {
  const navStyle = {
    padding: "20px",
    backgroundColor: "#2c3e50",
    marginBottom: "0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  };

  const linkStyle = {
    marginRight: "20px",
    textDecoration: "none",
    color: "#ecf0f1",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s"
  };

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/customer-manager" style={{...linkStyle, backgroundColor: "#27ae60"}}>
          ⭐ Gestionar Clientes
        </Link>
        <Link to="/customers" style={linkStyle}>Ver Clientes (Ej.2)</Link>
        <Link to="/sale-form" style={linkStyle}>Nueva Venta (Ej.3)</Link>
        <Link to="/sales" style={linkStyle}>Ventas (Ej.4)</Link>
        <Link to="/customer-search" style={linkStyle}>Buscar (Ej.5)</Link>
        <Link to="/sales-report" style={linkStyle}>Reporte (Ej.6)</Link>
      </nav>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/customer-manager" element={<CustomerManager />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sale-form" element={<SaleForm />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/customer-search" element={<CustomerSearch />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/" element={
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>🎓 Laboratorio X</h1>
            <h2 style={{ fontSize: "1.5em", color: "#666", marginBottom: "40px" }}>
              Programación Web - Ciclo 02, 2025
            </h2>
            
            <div style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "left",
              backgroundColor: "#f8f9fa",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>
                📋 Ejercicios Implementados:
              </h3>
              <ul style={{ lineHeight: "2", fontSize: "1.1em" }}>
                <li><strong>Gestión Visual:</strong> Crear, ver y eliminar clientes</li>
                <li><strong>Ejercicio 2:</strong> Listado de clientes</li>
                <li><strong>Ejercicio 3:</strong> Registrar nuevas ventas</li>
                <li><strong>Ejercicio 4:</strong> Ventas con JOIN (datos del cliente)</li>
                <li><strong>Ejercicio 5:</strong> Búsqueda por código</li>
                <li><strong>Ejercicio 6:</strong> Reporte de ventas por cliente</li>
              </ul>
              
              <div style={{
                marginTop: "30px",
                padding: "15px",
                backgroundColor: "#cdf3d6ff",
                borderLeft: "4px solid #12a334ff",
                borderRadius: "4px"
              }}>
                <strong>💡 Consejo:</strong> Comienza por "Gestionar Clientes" para crear datos de prueba
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;