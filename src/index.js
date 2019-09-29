import express from 'express'
import mongoose from 'mongoose'
import Property from './controllers/Property'

mongoose.connect('mongodb://localhost/alice', {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 100
})

mongoose.connection.on('error', (err) => { console.log(err) })

const app = express()

app.use('/properties', Property)

app.listen(3000)
