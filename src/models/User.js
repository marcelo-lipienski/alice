import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)
