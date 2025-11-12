import { pool } from '../database.js'

export const createSale = async (req, res) => {
  const { amount, id_customer } = req.body
  
  if (!amount || !id_customer) {
    return res.status(400).json({ 
      message: "amount y id_customer son requeridos" 
    })
  }
  
  if (amount <= 0) {
    return res.status(400).json({ 
      message: "El monto debe ser mayor a 0" 
    })
  }
  
  try {
    const customerCheck = await pool.query(
      'SELECT id FROM customers WHERE id = $1',
      [id_customer]
    )
    
    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ 
        message: "Cliente no encontrado" 
      })
    }
    
    const result = await pool.query(
      'INSERT INTO sales (amount, id_customer, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [amount, id_customer]
    )
    
    res.status(201).json({
      message: "Venta registrada exitosamente",
      sale: result.rows[0]
    })
  } catch (err) {
    console.error("Error al crear venta:", err)
    res.status(500).json({ 
      message: "Error al crear venta", 
      error: err.message 
    })
  }
}

export const getSalesWithCustomer = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.amount, s.created_at, c.name 
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      ORDER BY s.created_at DESC
    `)
    
    res.json(result.rows)
  } catch (err) {
    console.error("Error al obtener ventas:", err)
    res.status(500).json({ 
      message: "Error al obtener ventas", 
      error: err.message 
    })
  }
}

export const getSalesReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.name, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      GROUP BY c.name
      ORDER BY total_sales DESC
    `)
    
    res.json(result.rows)
  } catch (err) {
    console.error("Error al generar reporte:", err)
    res.status(500).json({ 
      message: "Error al generar reporte", 
      error: err.message 
    })
  }
}