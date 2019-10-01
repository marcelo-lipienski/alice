"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Error = _interopRequireDefault(require("../helpers/Error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const userSchema = new _mongoose.Schema({
  _id: _mongoose.Schema.Types.ObjectId,
  email: String,
  password: String
});
userSchema.pre('save', async function (next) {
  try {
    this.password = await _bcrypt.default.hash(this.password, 10);
  } catch (err) {
    return new _Error.default(err);
  }
});
module.exports = _mongoose.default.model('User', userSchema);