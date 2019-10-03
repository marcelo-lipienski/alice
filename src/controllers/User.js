import express from 'express'
import passport from 'passport'
import User from '../models/User'
import ServiceProvider from '../services/ServiceProvider'
import UserService from '../services/User'

const router = express.Router()

let Provider = new ServiceProvider(User)

router.get('/', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const response = await Provider.all('-password -jwt')
    res.status(response.status).json(response)
  }
)

router.get('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const id = req.params.id
    const response = await Provider.get(id, '-password -jwt')
    res.status(response.status).json(response)
  }
)

router.post('/', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { email, password }  = req.body
    const response = await Provider.create({ email, password }, 'email')
    res.status(response.status).json(response)
  }
)

router.put('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const id = req.params.id
    const params = {
      password: req.body.password
    }

    const response = await Provider.update(id, params)
    res.status(response.status).json(response)
  }
)

router.delete('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const id = req.params.id
    const response = await Provider.delete(id)
    res.status(response.status).json(response)
  }
)

router.post('/auth', async function (req, res) {
  const { email, password }  = req.body
  const response = await UserService.authenticate(email, password)
  res.status(response.status).json(response)
})

export default router
