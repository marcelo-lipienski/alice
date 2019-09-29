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
      const users = await _User.default.find({});
      return new _ResponseBuilder.default(users).success();
    } catch (err) {
      return new _Error.default(err);
    }
  } // Searchs for a given ObjectId or email


  async get(id) {
    try {
      var query = {
        _id: id
      };

      if (!_mongoose.default.Types.ObjectId.isValid(id)) {
        query = {
          email: id
        };
      }

      const user = await _User.default.find(query);
      return new _ResponseBuilder.default(user).success();
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

      if (user.length) {
        return new _ResponseBuilder.default(user).success();
      }

      params._id = _mongoose.default.Types.ObjectId();
      await _User.default.create(params);
      const newUser = await this.get(params.email);
      return new _ResponseBuilder.default(newUser).success();
    } catch (err) {
      return new _Error.default(err);
    }
  }

}

var _default = new UserService();

exports.default = _default;