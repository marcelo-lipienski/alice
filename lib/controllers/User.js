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
  const {
    id
  } = req.params;
  const user = await _User.default.get(id);
  res.json(user);
});
router.post('/', async function (req, res) {
  const {
    email,
    password
  } = req.body;
  const user = await _User.default.create({
    email,
    password
  });
  res.json(user);
});
router.put('/:id', async function (req, res) {
  const {
    id
  } = req.params;
  const {
    password
  } = req.body;
  const user = await _User.default.update({
    id,
    password
  });
});
router.delete('/:id', async function (req, res) {
  const {
    id
  } = req.params;
  const response = await _User.default.delete(id);
  res.status(response.status).json(response);
});
var _default = router;
exports.default = _default;