import express from 'express'
import passport from 'passport'
import UserService from '../services/User.js'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const users = await UserService.all()
    res.json(users)
  }
)

router.get('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { id } = req.params
    const user = await UserService.get(id)
    res.json(user)
  }
)

router.post('/', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { email, password }  = req.body
    const user = await UserService.create({ email, password })
    res.json(user)
  }
)

router.put('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { id } = req.params
    const { password } = req.body

    const user = await UserService.update({ id, password })
  }
)

router.delete('/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const { id } = req.params
    const response = await UserService.delete(id)
    res.status(response.status).json(response)
  }
)

router.post('/auth', async function (req, res) {
  const { email, password }  = req.body
  const response = await UserService.authenticate(email, password)
  res.status(response.status).json(response)
})

export default router
