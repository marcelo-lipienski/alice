import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import UserModel from './models/User'
import Property from './controllers/Property'
import User from './controllers/User'

mongoose.connect('mongodb://localhost/alice', {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 100
})

mongoose.connection.on('error', (err) => { console.log(err) })

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, async function (jwt_payload, done) {
  const user = await UserModel.findById(jwt_payload._id)
  return done(null, user)
}))

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/properties', Property)
app.use('/users', User)

app.listen(3000)
