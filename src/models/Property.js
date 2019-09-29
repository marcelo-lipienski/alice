import mongoose, { Schema } from 'mongoose'

const propertySchema = new Schema({
  _id: Schema.Types.ObjectId,
  ref: String
})

module.exports = mongoose.model('Property', propertySchema)
