"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _globalController = require("../controllers/globalController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get('/', _globalController.home);
globalRouter.route('/join').get(_globalController.getJoin).post(_globalController.postJoin);
globalRouter.route('/login').get(_globalController.getLogin).post(_globalController.postLogin);
globalRouter.get('/logout', _globalController.logout); // introRouter.get("/intro-site", introSite);
// introRouter.get("/intro-teacher", introTeacher);

globalRouter.get('/notices', _globalController.notices);
globalRouter.get('/notice/:id([0-9a-f]{24})', _globalController.noticeView); // globalRouter.get("/noticeBoard", noticeBoard);

globalRouter.get('/dashboard', _globalController.dashboard);
globalRouter.get('/recorder', _globalController.recorder);
var _default = globalRouter;
exports["default"] = _default;