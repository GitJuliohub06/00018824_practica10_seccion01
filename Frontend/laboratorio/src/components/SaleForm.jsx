import React, { useState, useEffect } from "react";
import API from "../utils/api";

const SaleForm = () => {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/api/customers");
        setCustomers(response.data);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
      }
    };
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!amount || !idCustomer) {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await API.post("/api/sales", {
        amount: parseFloat(amount),
        id_customer: parseInt(idCustomer),
      });
      setMessage(response.data.message);
      setAmount("");
      setIdCustomer("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar la venta");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Registrar Nueva Venta (Ejercicio 3)</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Cliente:</label>
          <select
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Seleccione un cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.code})
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingrese el monto"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Registrar Venta
        </button>
      </form>
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default SaleForm;