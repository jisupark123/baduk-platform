"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LDQuestionSchema = new _mongoose["default"].Schema({
  board: {
    type: Array,
    required: true
  },
  turn: {
    type: String,
    required: true
  },
  answer: {
    type: Array,
    required: true
  },
  failures: {
    type: Array,
    required: true
  },
  title: {
    type: String
  }
});

var LDQuestion = _mongoose["default"].model('Ldquestion', LDQuestionSchema);

var _default = LDQuestion;
exports["default"] = _default;