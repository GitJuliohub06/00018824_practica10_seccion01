import { Router } from 'express'
import { 
  getCustomers, 
  createCustomer, 
  deleteCustomer, 
  searchCustomerByCode,
  clearAllData 
} from '../controllers/customer.controller.js'

const router = Router()

router.get('/api/customers', getCustomers)

router.post('/api/customers', createCustomer)

router.delete('/api/customers/:id', deleteCustomer)

router.get('/api/customers/search', searchCustomerByCode)

router.delete('/api/clear-all-data', clearAllData)

export default router