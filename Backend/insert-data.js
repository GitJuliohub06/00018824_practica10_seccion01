
import { pool } from './database.js'

async function insertSampleData() {
  console.log('🚀 Insertando datos de prueba...\n')
  
  try {
    console.log('👥 Insertando clientes...')
    const customers = [
      { name: 'Juan Pérez', address: 'Calle Principal 123, San Salvador', phone: '2222-1111', code: 'CUST001' },
      { name: 'María González', address: 'Avenida Central 456, Santa Tecla', phone: '2222-2222', code: 'CUST002' },
      { name: 'Carlos Rodríguez', address: 'Boulevard Este 789, Soyapango', phone: '2222-3333', code: 'CUST003' },
      { name: 'Ana Martínez', address: 'Colonia Norte 321, Apopa', phone: '2222-4444', code: 'CUST004' },
      { name: 'Luis Hernández', address: 'Residencial Sur 654, Antiguo Cuscatlán', phone: '2222-5555', code: 'CUST005' },
      { name: 'Sofía López', address: 'Pasaje Oeste 987, San Marcos', phone: '2222-6666', code: 'CUST006' },
      { name: 'Pedro Ramírez', address: 'Calle del Sol 111, Ilopango', phone: '2222-7777', code: 'CUST007' }
    ]
    
    const insertedCustomerIds = []
    
    for (const customer of customers) {
      try {
        const result = await pool.query(
          'INSERT INTO customers (name, address, phone, code) VALUES ($1, $2, $3, $4) RETURNING id',
          [customer.name, customer.address, customer.phone, customer.code]
        )
        insertedCustomerIds.push(result.rows[0].id)
        console.log(`   ✓ ${customer.name} (ID: ${result.rows[0].id})`)
      } catch (err) {
        if (err.code === '23505') { 
          console.log(`   ⚠️  ${customer.name} - Ya existe`)
          const existing = await pool.query(
            'SELECT id FROM customers WHERE code = $1',
            [customer.code]
          )
          if (existing.rows.length > 0) {
            insertedCustomerIds.push(existing.rows[0].id)
          }
        } else {
          console.log(`   ❌ Error insertando ${customer.name}:`, err.message)
        }
      }
    }
    
    console.log(`\n   Total de clientes disponibles: ${insertedCustomerIds.length}`)
    
    if (insertedCustomerIds.length === 0) {
      console.log('\n❌ No se pueden insertar ventas: no hay clientes disponibles')
      return
    }
    
    console.log('\n💰 Insertando ventas...')
    const sales = [
      { amount: 150.50, customerId: insertedCustomerIds[0], daysAgo: 1 },
      { amount: 320.00, customerId: insertedCustomerIds[0], daysAgo: 5 },
      { amount: 89.99, customerId: insertedCustomerIds[1], daysAgo: 2 },
      { amount: 500.00, customerId: insertedCustomerIds[1], daysAgo: 8 },
      { amount: 45.75, customerId: insertedCustomerIds[2], daysAgo: 3 },
      { amount: 200.00, customerId: insertedCustomerIds[2], daysAgo: 7 },
      { amount: 125.50, customerId: insertedCustomerIds[2], daysAgo: 15 },
      { amount: 750.00, customerId: insertedCustomerIds[3 % insertedCustomerIds.length], daysAgo: 4 },
      { amount: 99.99, customerId: insertedCustomerIds[4 % insertedCustomerIds.length], daysAgo: 10 },
      { amount: 180.25, customerId: insertedCustomerIds[4 % insertedCustomerIds.length], daysAgo: 12 },
      { amount: 430.00, customerId: insertedCustomerIds[5 % insertedCustomerIds.length], daysAgo: 6 },
      { amount: 275.50, customerId: insertedCustomerIds[6 % insertedCustomerIds.length], daysAgo: 9 }
    ]
    
    let salesInserted = 0
    for (const sale of sales) {
      try {
        await pool.query(
          `INSERT INTO sales (amount, id_customer, created_at) 
           VALUES ($1, $2, NOW() - INTERVAL '${sale.daysAgo} days')`,
          [sale.amount, sale.customerId]
        )
        console.log(`   ✓ Venta: $${sale.amount} - Cliente ID: ${sale.customerId}`)
        salesInserted++
      } catch (err) {
        console.log(`   ❌ Error insertando venta:`, err.message)
      }
    }
    
    console.log(`\n   Total de ventas insertadas: ${salesInserted}`)
    
    console.log('\n📊 RESUMEN FINAL:')
    const totalCustomers = await pool.query('SELECT COUNT(*) FROM customers')
    const totalSales = await pool.query('SELECT COUNT(*) FROM sales')
    
    console.log(`   👥 Total clientes: ${totalCustomers.rows[0].count}`)
    console.log(`   💰 Total ventas: ${totalSales.rows[0].count}`)
    console.log('\n✅ ¡Datos insertados exitosamente!')
    console.log('🚀 Ahora reinicia el servidor backend: node app.js\n')
    
  } catch (err) {
    console.error('\n❌ Error al insertar datos:', err.message)
    console.error('Detalles:', err)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

insertSampleData()