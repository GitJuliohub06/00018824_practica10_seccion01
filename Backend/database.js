import pkg from 'pg'
import { config } from './config/config.js'

const { Pool } = pkg

export const pool = new Pool(config.database)

pool.on('connect', () => {
  console.log('Conectado a la base de datos PostgreSQL')
})

pool.on('error', (err) => {
  console.error('Error inesperado en la base de datos:', err)
  process.exit(-1)
})

export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('🔗 Conexión a la base de datos exitosa:', result.rows[0].now)
    return true
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err)
    return false
  }
}