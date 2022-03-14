"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contestSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  dates: [{
    type: Date,
    required: true
  }],
  sections: [{
    type: Object,
    required: true
  }]
});

var Contest = _mongoose["default"].model('Contest', contestSchema);

var _default = Contest;
exports["default"] = _default;