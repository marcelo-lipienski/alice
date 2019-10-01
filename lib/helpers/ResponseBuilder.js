"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = new class ResponseBuilder {
  construct() {}

  success(status, data) {
    return this._response(status, data);
  }

  error(status, data) {
    return this._response(status, data);
  }

  _response(status, data) {
    return {
      status: status,
      data
    };
  }

}();

exports.default = _default;