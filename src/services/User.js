import mongoose from 'mongoose'
import Error from '../helpers/Error.js'
import ResponseBuilder from '../helpers/ResponseBuilder.js'
import User from '../models/User.js'

class UserService {
  async all() {
    try {
      const users = await User.find({ }, '-password')
      return ResponseBuilder.success(200, users)
    } catch(err) {
      return new Error(err)
    }
  }

  // Searchs for a given ObjectId or email
  async get(id) {
    let query = { _id: id }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      query = { email: id }
    }

    try {
      let user = await User.findOne(query, '-password')

      if (user == null) user = []

      return ResponseBuilder.success(200, user)
    } catch(err) {
      return new Error(err)
    }
  }

  // Creates a user
  // Expects an object matching the User mongoose model
  async create(params) {
    if (!params.email) {
      return new Error({
        name: 'Invalid object',
        message: 'Trying to save an invalid user object'
      })
    }

    try {
      const user = await this.get(params.email)

      if (user.data._id) {
        return ResponseBuilder.error(400, user.data)
      }

      params._id = mongoose.Types.ObjectId()

      const newUser = await new User(params).save()

      return ResponseBuilder.success(200, newUser)
    } catch (err) {
      return new Error(err)
    }
  }

  async update(params) {
    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return new Error({
        name: 'Invalid object',
        message: 'Trying to update an invalid user'
      })
    }

    if (!params.password || (params.password).length == 0) {
      return new Error({
        name: 'Invalid object',
        message: 'Password can\'t be empty'
      })
    }

    try {
      const status = await User.findOneAndUpdate(
        { _id: params.id },
        params.password
      )

      if (status instanceof Object) {
        return new ResponseBuilder(status).success()
      }

      return new Error({
        name: 'Invalid operation',
        message: 'User was not found for update'
      })
    } catch (err) {
      return new Error(err)
    }
  }

  async delete(id) {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Error({
        name: 'Invalid object',
        message: 'Trying to delete an user without a valid id'
      })
    }

    try {
      const status = await User
        .findOneAndDelete({ _id: id })
        .select('-password')

      if (status instanceof Object) {
        return ResponseBuilder.success(200, status)
      }

      return ResponseBuilder.error(400, {
        name: 'Invalid operation',
        message: 'User was not found for deletion'
      })
    } catch (err) {
      return new Error(err)
    }
  }
}

export default new UserService()
