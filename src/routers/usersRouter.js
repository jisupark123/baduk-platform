import express from 'express';
import {
  calendar,
  getContestFilter,
  getMakeGibo,
  postContestFilter,
  postMakeGibo,
  startKakaoLogin,
} from '../controllers/usersController';

const usersRouter = express.Router();

// usersRouter.get("/kakao/start", startKakaoLogin);
usersRouter.get('/calendar', calendar);
usersRouter
  .route('/contest-filter')
  .get(getContestFilter)
  .post(postContestFilter);
usersRouter.route('/make-gibo').get(getMakeGibo).post(postMakeGibo);

// usersRouter.get("/delete", deleteUser);

export default usersRouter;
