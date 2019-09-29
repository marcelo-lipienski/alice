import express from 'express'
import PropertyService from '../services/Property.js'

const router = express.Router()

router.get('/', async function (req, res) {
  const properties = await PropertyService.all()
  res.json(properties)
})

router.post('/', async function (req, res) {

})

export default router
