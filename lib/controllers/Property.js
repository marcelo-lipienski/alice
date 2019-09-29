"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Property = _interopRequireDefault(require("../services/Property.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async function (req, res) {
  const properties = await _Property.default.all();
  res.json(properties);
});
router.post('/', async function (req, res) {});
var _default = router;
exports.default = _default;