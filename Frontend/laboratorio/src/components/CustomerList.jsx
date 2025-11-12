import React, { useEffect, useState } from "react";
import API from "../utils/api";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/api/customers");
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los clientes");
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Clientes (Ejercicio 2)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Dirección</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Teléfono</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Código</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.address}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.phone}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{customer.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;