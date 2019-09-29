import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Property from './controllers/Property'
import User from './controllers/User'

mongoose.connect('mongodb://localhost/alice', {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 100
})

mongoose.connection.on('error', (err) => { console.log(err) })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/properties', Property)
app.use('/users', User)

app.listen(3000)
