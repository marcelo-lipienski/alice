"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class _default {
  constructor(err) {
    return {
      error: err.name,
      message: err.message
    };
  }

}

exports.default = _default;