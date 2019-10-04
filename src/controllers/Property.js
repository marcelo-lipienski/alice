import express from 'express'
import passport from 'passport'
import Property from '../models/Property'
import ServiceProvider from '../services/ServiceProvider'

const router = express.Router()

let Provider = new ServiceProvider(Property)

/**
 * GET /properties
 */
router.get('/', passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    const response = await Provider.all()
    res.status(response.status).json(response)
  }
)

/**
 * GET /properties/:id
 */
router.get('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { id } = req.params
    const response = await Provider.get(id)
    res.status(response.status).json(response)
  }
)

/**
 * POST /properties/
 * @param {string} ref Property reference code
 * @param {number} price Property rent
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const fields = [
      'owner', 'ref', 'about', 'description', 'bedrooms', 'bathrooms',
      'land_area', 'constructed_area', 'selling', 'sell_price', 'rent'
    ]

    const uniqueField = 'ref'

    const response = await Provider.create(req.body, fields, uniqueField)
    res.status(response.status).json(response)
  }
)

/**
 * PUT /properties/:id
 * @param {string} id A valid mongoose ObjectId
 * @param {number} price Property rent
 * @param {number} area Property area
 */
router.put('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const id = req.params.id
    const fields = [
      'owner', 'ref', 'about', 'description', 'bedrooms', 'bathrooms',
      'land_area', 'constructed_area', 'selling', 'sell_price', 'rent'
    ]


    const response = await Provider.update(id, req.body, fields)
    res.status(response.status).json(response)
  }
)

/**
 * DELETE /properties/:id
 * @param {string} id A valid mongoose ObjectId
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const id = req.params.id
    const response = await Provider.delete(id)
    res.status(response.status).json(response)
  }
)

export default router
