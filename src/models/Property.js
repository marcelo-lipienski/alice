import mongoose, { Schema } from 'mongoose'

const propertySchema = new Schema({
  _id: Schema.Types.ObjectId,
  ref: { type: String, required: true },
  price: Number,
  area: Number
})

module.exports = mongoose.model('Property', propertySchema)
