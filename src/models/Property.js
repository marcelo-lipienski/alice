import mongoose, { Schema } from 'mongoose'

const propertySchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ref: { type: String, required: true },
  about: { type: String },
  description: { type: String, required: true },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  land_area: { type: Number, default: 0 },
  constructed_area: { type: Number, default: 0 },
  selling: { type: Boolean, required: true },
  sell_price: { type: Number, default: 0 },
  rent: { type: Number, default: 0 }
})

module.exports = mongoose.model('Property', propertySchema)
