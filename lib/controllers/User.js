"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../services/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async function (req, res) {
  const users = await _User.default.all();
  res.json(users);
});
router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const user = await _User.default.get(id);
  res.json(user);
});
router.post('/', async function (req, res) {
  const params = {
    email: req.body.email
  };
  const user = await _User.default.create(params);
  res.json(user);
});
var _default = router;
exports.default = _default;