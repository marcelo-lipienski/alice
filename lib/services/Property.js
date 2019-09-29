"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Error = _interopRequireDefault(require("../helpers/Error.js"));

var _Property = _interopRequireDefault(require("../models/Property.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PropertyService {
  async all() {
    try {
      return await _Property.default.find({});
    } catch (err) {
      return new _Error.default(err);
    }
  }

  async save(property) {
    try {} catch (err) {
      return new _Error.default(err);
    }
  }

}

var _default = new PropertyService();

exports.default = _default;