import { pool } from '../database.js'

const generateCustomerCode = async () => {
  let code
  let exists = true
  
  while (exists) {
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    code = `CUST${randomNum}`
    
    const result = await pool.query(
      'SELECT id FROM customers WHERE code = $1',
      [code]
    )
    exists = result.rows.length > 0
  }
  
  return code
}

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    console.error("Error al obtener clientes:", err)
    res.status(500).json({ 
      message: "Error al obtener clientes", 
      error: err.message 
    })
  }
}

export const createCustomer = async (req, res) => {
  const { name, address, phone } = req.body
  
  if (!name) {
    return res.status(400).json({ 
      message: "El nombre es requerido" 
    })
  }
  
  try {
    const code = await generateCustomerCode()
    
    const result = await pool.query(
      'INSERT INTO customers (name, address, phone, code) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address || '', phone || '', code]
    )
    
    res.status(201).json({
      message: "Cliente creado exitosamente",
      customer: result.rows[0]
    })
  } catch (err) {
    console.error("Error al crear cliente:", err)
    res.status(500).json({ 
      message: "Error al crear cliente", 
      error: err.message 
    })
  }
}

export const deleteCustomer = async (req, res) => {
  const { id } = req.params
  
  try {
    const result = await pool.query(
      'DELETE FROM customers WHERE id = $1 RETURNING *',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "Cliente no encontrado" 
      })
    }
    
    res.json({
      message: "Cliente eliminado exitosamente",
      customer: result.rows[0]
    })
  } catch (err) {
    console.error("Error al eliminar cliente:", err)
    res.status(500).json({ 
      message: "Error al eliminar cliente", 
      error: err.message 
    })
  }
}

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

export const clearAllData = async (req, res) => {
  try {
    await pool.query('DELETE FROM sales')
    await pool.query('DELETE FROM customers')
    await pool.query('ALTER SEQUENCE sales_id_seq RESTART WITH 1')
    await pool.query('ALTER SEQUENCE customers_id_seq RESTART WITH 1')
    
    res.json({
      message: "Todos los datos han sido eliminados exitosamente"
    })
  } catch (err) {
    console.error("Error al limpiar datos:", err)
    res.status(500).json({ 
      message: "Error al limpiar datos", 
      error: err.message 
    })
  }
}