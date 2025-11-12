import React, { useEffect, useState } from "react";
import API from "../utils/api";

const SalesReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await API.get("/api/sales/report");
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el reporte");
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const calculateTotal = () => {
    return report.reduce((sum, item) => sum + parseFloat(item.total_sales), 0);
  };

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reporte de Ventas por Cliente (Ejercicio 6)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cliente</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                ${parseFloat(item.total_sales).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>TOTAL GENERAL</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
              ${calculateTotal().toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;