"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersController = require("../controllers/usersController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersRouter = _express["default"].Router(); // usersRouter.get("/kakao/start", startKakaoLogin);


usersRouter.get('/calendar', _usersController.calendar);
usersRouter.route('/contest-filter').get(_usersController.getContestFilter).post(_usersController.postContestFilter);
usersRouter.route('/make-gibo').get(_usersController.getMakeGibo).post(_usersController.postMakeGibo); // usersRouter.get("/delete", deleteUser);

var _default = usersRouter;
exports["default"] = _default;