"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Property = _interopRequireDefault(require("./controllers/Property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://localhost/alice', {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 100
});

_mongoose.default.connection.on('error', err => {
  console.log(err);
});

const app = (0, _express.default)();
app.use('/properties', _Property.default);
app.listen(3000);