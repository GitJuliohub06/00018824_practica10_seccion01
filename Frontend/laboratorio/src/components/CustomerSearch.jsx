import React, { useState } from "react";
import API from "../utils/api";

const CustomerSearch = () => {
  const [code, setCode] = useState("");
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCustomers([]);
    setSearched(false);

    if (!code.trim()) {
      setError("Por favor ingrese un código");
      return;
    }

    try {
      const response = await API.get(`/api/customers/search?code=${code}`);
      setCustomers(response.data);
      setSearched(true);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No se encontró ningún cliente con ese código");
      } else {
        setError(err.response?.data?.message || "Error al buscar cliente");
      }
      setSearched(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buscar Cliente por Código (Ejercicio 5)</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingrese el código del cliente"
          style={{ padding: "8px", marginRight: "10px", width: "200px" }}
        />
        <button type="submit" style={{ padding: "8px 20px" }}>
          Buscar
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && customers.length > 0 && (
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
      )}
    </div>
  );
};

export default CustomerSearch;