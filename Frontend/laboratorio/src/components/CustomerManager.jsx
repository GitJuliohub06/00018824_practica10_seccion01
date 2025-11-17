import React, { useEffect, useState } from "react";
import API from "../utils/api";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (!formData.name.trim()) {
      setError("El nombre es requerido");
      setSubmitting(false);
      return;
    }

    try {
      const response = await API.post("/api/customers", formData);
      setSuccess(response.data.message);
      setFormData({ name: "", address: "", phone: "" });
      setShowForm(false);
      fetchCustomers(); 
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear cliente");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de eliminar al cliente "${name}"?`)) {
      return;
    }

    try {
      await API.delete(`/api/customers/${id}`);
      setSuccess("Cliente eliminado exitosamente");
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar cliente");
    }
  };

  const handleClearAll = async () => {
    const confirmation = window.prompt(
      'Esta acción eliminará TODOS los clientes y ventas.\nEscribe "ELIMINAR TODO" para confirmar:'
    );

    if (confirmation !== "ELIMINAR TODO") {
      return;
    }

    try {
      const response = await API.delete("/api/clear-all-data");
      setSuccess(response.data.message);
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || "Error al limpiar datos");
    }
  };

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px" 
      }}>
        <h2>Gestión de Clientes</h2>
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            {showForm ? "Cancelar" : "➕ Nuevo Cliente"}
          </button>
          <button
            onClick={handleClearAll}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            🗑️ Limpiar Todo
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: "10px",
          backgroundColor: "#ffebee",
          color: "#c62828",
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: "10px",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          {success}
        </div>
      )}

      {showForm && (
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h3>Crear Nuevo Cliente</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Nombre: *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del cliente"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Dirección:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Ingrese la dirección"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Teléfono:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Ingrese el teléfono"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
            </div>

            <p style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
              * El código del cliente se generará automáticamente
            </p>

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "10px 30px",
                backgroundColor: submitting ? "#ccc" : "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: submitting ? "not-allowed" : "pointer",
                fontSize: "16px"
              }}
            >
              {submitting ? "Guardando..." : "Guardar Cliente"}
            </button>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Código</th>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Nombre</th>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Dirección</th>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Teléfono</th>
              <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                  No hay clientes registrados. Crea uno nuevo para comenzar.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{customer.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                    <span style={{
                      backgroundColor: "#e3f2fd",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontFamily: "monospace"
                    }}>
                      {customer.code}
                    </span>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px", fontWeight: "bold" }}>
                    {customer.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{customer.address || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px" }}>{customer.phone || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(customer.id, customer.name)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
        <p>📊 Total de clientes: <strong>{customers.length}</strong></p>
      </div>
    </div>
  );
};

export default CustomerManager;