import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Error from '../helpers/Error.js'
import ResponseBuilder from '../helpers/ResponseBuilder.js'
import User from '../models/User.js'

class UserService {
  async authenticate(email, password) {
    if (!email || !password) {
      return ResponseBuilder.error(400, {})
    }

    let user = await User.findOne({ email: email })
    if (!user) {
      return ResponseBuilder.error(400)
    }

    const password_match = await bcrypt.compare(password, user.password)

    if (password_match) {
      const token = jwt.sign({ _id: user._id }, 'secret', {
        expiresIn: 60 * 60 * 24
      })

      await User.findOneAndUpdate({ _id: user._id }, {
        jwt: token
      })

      return ResponseBuilder.success(200, { token: token })
    } else {
      return ResponseBuilder.error(400)
    }
  }
}

export default new UserService()
