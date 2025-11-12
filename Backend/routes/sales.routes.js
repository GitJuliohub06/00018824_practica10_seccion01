import { Router } from 'express'
import { createSale, getSalesWithCustomer, getSalesReport } from '../controllers/sales.controller.js'

const router = Router()

router.post('/api/sales', createSale)

router.get('/api/sales', getSalesWithCustomer)

router.get('/api/sales/report', getSalesReport)

export default router