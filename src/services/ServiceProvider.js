import mongoose from 'mongoose'
import Error from '../helpers/Error'
import ResponseBuilder from '../helpers/ResponseBuilder'
import Property from '../models/Property'
import User from '../models/User'

export default class ServiceProvider {
  constructor(entity) {
    this.entity = entity
  }

  async all(exp = '') {
    try {
      const data = await this.entity.find({ }, exp)
      return ResponseBuilder.success(200, data)
    } catch (err) {
      return ResponseBuilder.error(400, err)
    }
  }

  // Searchs for a given ObjectId or email
  async get(id, exp = '') {
    let query = { _id: id }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      query = { jwt: id }
    }

    try {
      let data = await this.entity.findOne(query, exp)

      if (data == null) data = []

      return ResponseBuilder.success(200, data)
    } catch(err) {
      return ResponseBuilder.error(400, err)
    }
  }

  // Creates a user
  // Expects an object matching the User mongoose model
  async create(values, fields, uniqueField = false) {
    let object = { }

    fields.forEach((field, index) => {
      if (values[field]) {
        object[field] = values[field]
      }
    })

    try {
      if (uniqueField) {
        const res = await this.entity.findOne({ [uniqueField]: object[uniqueField] })
        if (res) {
          return ResponseBuilder.error(400, res)
        }
      }

      object._id = mongoose.Types.ObjectId()

      const newDocument = await new this.entity(object).save()

      return ResponseBuilder.success(200, newDocument)
    } catch (err) {
      return ResponseBuilder.error(400, err)
    }
  }

  async update(id, values, fields) {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return ResponseBuilder.error(400, {
        name: 'Invalid object',
        message: 'Trying to update an invalid user'
      })
    }

    let object = { }

    fields.forEach((field, index) => {
      if (values[field]) {
        object[field] = values[field]
      }
    })

    try {
      const status = await this.entity.findByIdAndUpdate(id, object, { new: true })

      if (status instanceof Object) {
        return ResponseBuilder.success(200, status)
      }

      return ResponseBuilder.error(400, {
        name: 'Invalid operation',
        message: 'Record was not found for update'
      })
    } catch (err) {
      return new Error(err)
    }
  }

  async delete(id, select = '') {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return ResponseBuilder.error(400, {
        name: 'Invalid object',
        message: 'Trying to delete a record without a valid id'
      })
    }

    try {
      const status = await this.entity.findByIdAndDelete(id).select(select)

      if (status instanceof Object) {
        return ResponseBuilder.success(200, status)
      }

      return ResponseBuilder.error(400, {
        name: 'Invalid operation',
        message: 'Record was not found for deletion'
      })
    } catch (err) {
      return new Error(err)
    }
  }

}
