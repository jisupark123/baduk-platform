"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _manageController = require("../controllers/manageController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var manageRouter = _express["default"].Router(); // manageRouter.get("/", manageHome);


manageRouter.route('/notices').get(_manageController.manageNotices);
manageRouter.route('/notice-upload').get(_manageController.getNoticeUpload).post(_manageController.postNoticeUpload);
manageRouter.get('/notice-delete', _manageController.deleteNotices);
manageRouter.route('/contest-upload').get(_manageController.getUploadContest).post(_manageController.postUploadContest);
manageRouter.route('/question-upload').get(_manageController.getUploadQuestion);
manageRouter.route('/answer-upload').get(_manageController.getUploadAnswer);
manageRouter.route('/failure-upload').get(_manageController.getUploadFailure);
manageRouter.post('/save-question', _manageController.postSaveQuestion); // manageRouter.route('/booked',)
// manageRouter
//   .route("/noticeBoard")
//   .get(getNoticeBoard)
//   .post(PostNoticeBoard)
//   .delete(DeleteNoticeBoard);

var _default = manageRouter;
exports["default"] = _default;