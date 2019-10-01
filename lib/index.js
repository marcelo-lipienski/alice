"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _Property = _interopRequireDefault(require("./controllers/Property"));

var _User = _interopRequireDefault(require("./controllers/User"));

var _User2 = _interopRequireDefault(require("./services/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://localhost/alice', {
  useNewUrlParser: true,
  reconnectTries: 3,
  reconnectInterval: 100
});

_mongoose.default.connection.on('error', err => {
  console.log(err);
});

_passport.default.use(new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, async function (jwt_payload, done) {
  const user = await _User2.default.get(jwt_payload.sub);
  return done(null, user);
}));

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/properties', _Property.default);
app.use('/users', _User.default);
app.listen(3000);