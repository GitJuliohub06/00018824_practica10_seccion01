import { Router } from 'express'
import { getCustomers, searchCustomerByCode } from '../controllers/customer.controller.js'

const router = Router()

router.get('/api/customers', getCustomers)

router.get('/api/customers/search', searchCustomerByCode)

export default router