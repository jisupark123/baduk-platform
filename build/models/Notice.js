"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var noticeSchema = new _mongoose["default"].Schema({
  // writer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  writtenAt: {
    type: String,
    required: true
  },
  isImportant: {
    type: Boolean,
    required: true,
    "default": false
  }
});

var Notice = _mongoose["default"].model('Notice', noticeSchema);

var _default = Notice;
exports["default"] = _default;