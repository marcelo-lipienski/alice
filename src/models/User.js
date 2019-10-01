import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import Error from '../helpers/Error.js'

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String
})

userSchema.pre('save', async function(next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
  } catch(err) {
    return new Error(err)
  }
})

module.exports = mongoose.model('User', userSchema)
