import React, { useEffect, useState } from "react";
import API from "../utils/api";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await API.get("/api/sales");
        setSales(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las ventas");
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Ventas con Cliente (Ejercicio 4)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID Venta</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Monto</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fecha</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nombre Cliente</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{sale.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ${parseFloat(sale.amount).toFixed(2)}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {formatDate(sale.created_at)}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{sale.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;