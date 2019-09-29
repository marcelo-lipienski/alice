"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Property = _interopRequireDefault(require("./controllers/Property"));

var _User = _interopRequireDefault(require("./controllers/User"));

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
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/properties', _Property.default);
app.use('/users', _User.default);
app.listen(3000);