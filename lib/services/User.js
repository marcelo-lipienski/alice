"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Error = _interopRequireDefault(require("../helpers/Error.js"));

var _ResponseBuilder = _interopRequireDefault(require("../helpers/ResponseBuilder.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  async all() {
    try {
      const users = await _User.default.find({}, '-password');
      return _ResponseBuilder.default.success(200, users);
    } catch (err) {
      return new _Error.default(err);
    }
  } // Searchs for a given ObjectId or email


  async get(id) {
    let query = {
      _id: id
    };

    if (!_mongoose.default.Types.ObjectId.isValid(id)) {
      query = {
        email: id
      };
    }

    try {
      let user = await _User.default.findOne(query, '-password');
      if (user == null) user = [];
      return _ResponseBuilder.default.success(200, user);
    } catch (err) {
      return new _Error.default(err);
    }
  } // Creates a user
  // Expects an object matching the User mongoose model


  async create(params) {
    if (!params.email) {
      return new _Error.default({
        name: 'Invalid object',
        message: 'Trying to save an invalid user object'
      });
    }

    try {
      const user = await this.get(params.email);

      if (user.data._id) {
        return _ResponseBuilder.default.error(400, user.data);
      }

      params._id = _mongoose.default.Types.ObjectId();
      const newUser = await new _User.default(params).save();
      return _ResponseBuilder.default.success(200, newUser);
    } catch (err) {
      return new _Error.default(err);
    }
  }

  async update(params) {
    if (!params.id || !_mongoose.default.Types.ObjectId.isValid(params.id)) {
      return new _Error.default({
        name: 'Invalid object',
        message: 'Trying to update an invalid user'
      });
    }

    if (!params.password || params.password.length == 0) {
      return new _Error.default({
        name: 'Invalid object',
        message: 'Password can\'t be empty'
      });
    }

    try {
      const status = await _User.default.findOneAndUpdate({
        _id: params.id
      }, params.password);

      if (status instanceof Object) {
        return new _ResponseBuilder.default(status).success();
      }

      return new _Error.default({
        name: 'Invalid operation',
        message: 'User was not found for update'
      });
    } catch (err) {
      return new _Error.default(err);
    }
  }

  async delete(id) {
    if (!id || !_mongoose.default.Types.ObjectId.isValid(id)) {
      return new _Error.default({
        name: 'Invalid object',
        message: 'Trying to delete an user without a valid id'
      });
    }

    try {
      const status = await _User.default.findOneAndDelete({
        _id: id
      }).select('-password');

      if (status instanceof Object) {
        return _ResponseBuilder.default.success(200, status);
      }

      return _ResponseBuilder.default.error(400, {
        name: 'Invalid operation',
        message: 'User was not found for deletion'
      });
    } catch (err) {
      return new _Error.default(err);
    }
  }

}

var _default = new UserService();

exports.default = _default;