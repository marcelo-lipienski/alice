import express from 'express'
import UserService from '../services/User.js'

const router = express.Router()

router.get('/', async function (req, res) {
  const users = await UserService.all()
  res.json(users)
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  const user = await UserService.get(id)
  res.json(user)
})

router.post('/', async function (req, res) {
  const { email, password }  = req.body
  const user = await UserService.create({ email, password })
  res.json(user)
})

router.put('/:id', async function (req, res) {
  const { id } = req.params
  const { password } = req.body

  const user = await UserService.update({ id, password })
})

router.delete('/:id', async function (req, res) {
  const { id } = req.params

  const response = await UserService.delete(id)

  res.status(response.status).json(response)
})

export default router
