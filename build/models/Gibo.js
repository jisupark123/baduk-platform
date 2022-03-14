"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var giboSchema = new _mongoose["default"].Schema({
  title: {
    type: String
  },
  blackPlayer: {
    type: String,
    required: true
  },
  whitePlayer: {
    type: String,
    required: true
  },
  adventage: {
    type: Number,
    required: true,
    "default": 6.5
  },
  result: {
    type: String,
    required: true
  },
  gibo: {
    type: Array,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

var Gibo = _mongoose["default"].model('Gibo', giboSchema);

var _default = Gibo;
exports["default"] = _default;