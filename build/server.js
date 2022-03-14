"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _middleware = require("./middleware");

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _usersRouter = _interopRequireDefault(require("./routers/usersRouter"));

var _manageRouter = _interopRequireDefault(require("./routers/manageRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])('dev');
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COKKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use(_middleware.localsMiddleware);
app.use('/', _globalRouter["default"]);
app.use('/users', _usersRouter["default"]);
app.use('/manage', _manageRouter["default"]);
app.use('/assets', _express["default"]["static"]('assets'));
var _default = app;
exports["default"] = _default;