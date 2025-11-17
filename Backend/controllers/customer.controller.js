import { pool } from '../database.js'

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers')
    res.json(result.rows)
  } catch (err) {
    console.error("Error al obtener clientes:", err)
    res.status(500).json({ 
      message: "Error al obtener clientes", 
      error: err.message 
    })
  }
}

//ej 4
export const searchCustomerByCode = async (req, res) => {
  const { code } = req.query
  
  if (!code) {
    return res.status(400).json({ 
      message: "El parámetro 'code' es requerido" 
    })
  }
  
  try {
    const result = await pool.query(
      'SELECT * FROM customers WHERE code = $1',
      [code]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "Cliente no encontrado" 
      })
    }
    
    res.json(result.rows)
  } catch (err) {
    console.error("Error al buscar cliente:", err)
    res.status(500).json({ 
      message: "Error al buscar cliente", 
      error: err.message 
    })
  }
}