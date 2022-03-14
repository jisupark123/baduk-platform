import express from 'express';
import {
  manageNotices,
  getNoticeUpload,
  postNoticeUpload,
  deleteNotices,
  getUploadContest,
  postUploadContest,
  getUploadQuestion,
  getUploadAnswer,
  getUploadFailure,
  postSaveQuestion,
} from '../controllers/manageController';

const manageRouter = express.Router();

// manageRouter.get("/", manageHome);
manageRouter.route('/notices').get(manageNotices);
manageRouter
  .route('/notice-upload')
  .get(getNoticeUpload)
  .post(postNoticeUpload);

manageRouter.get('/notice-delete', deleteNotices);
manageRouter
  .route('/contest-upload')
  .get(getUploadContest)
  .post(postUploadContest);

manageRouter.route('/question-upload').get(getUploadQuestion);
manageRouter.route('/answer-upload').get(getUploadAnswer);
manageRouter.route('/failure-upload').get(getUploadFailure);
manageRouter.post('/save-question', postSaveQuestion);
// manageRouter.route('/booked',)

// manageRouter
//   .route("/noticeBoard")
//   .get(getNoticeBoard)
//   .post(PostNoticeBoard)
//   .delete(DeleteNoticeBoard);

export default manageRouter;
