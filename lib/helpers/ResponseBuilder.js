"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ResponseBuilder {
  constructor(data) {
    this.data = data;
  }

  success() {
    return this.data;
  }

}

var _default = ResponseBuilder;
exports.default = _default;