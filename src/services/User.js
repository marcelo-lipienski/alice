import mongoose from 'mongoose'
import Error from '../helpers/Error.js'
import ResponseBuilder from '../helpers/ResponseBuilder.js'
import User from '../models/User.js'

class UserService {
  async all() {
    try {
      const users = await User.find({ })
      return (new ResponseBuilder(users)).success()
    } catch(err) {
      return new Error(err)
    }
  }

  // Searchs for a given ObjectId or email
  async get(id) {
    try {
      var query = { _id: id }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        query = { email: id }
      }

      const user = await User.find(query)
      return (new ResponseBuilder(user)).success()
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

      if (user.length) {
        return (new ResponseBuilder(user)).success()
      }

      params._id = mongoose.Types.ObjectId()

      await User.create(params)
      const newUser = await this.get(params.email)

      return (new ResponseBuilder(newUser)).success()
    } catch (err) {
      return new Error(err)
    }
  }
}

export default new UserService()
