"use strict";

require("dotenv/config");

require("./db");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;

_server["default"].listen(PORT, function () {
  console.log("Listening to ".concat(PORT));
});