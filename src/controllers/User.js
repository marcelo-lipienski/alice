import express from 'express'
import UserService from '../services/User.js'

const router = express.Router()

router.get('/', async function (req, res) {
  const users = await UserService.all()
  res.json(users)
})

router.get('/:id', async function (req, res) {
  const id = req.params.id
  const user = await UserService.get(id)
  res.json(user)
})

router.post('/', async function (req, res) {
  const params = {
    email: req.body.email
  }

  const user = await UserService.create(params)
  res.json(user)
})

export default router
