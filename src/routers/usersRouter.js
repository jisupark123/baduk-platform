import express from 'express';
import {
  calendar,
  getContestFilter,
  postContestFilter,
  startKakaoLogin,
} from '../controllers/usersController';
import { protectorMiddleware } from '../middleware';

const usersRouter = express.Router();

// usersRouter.get("/kakao/start", startKakaoLogin);
usersRouter.get('/calendar', calendar);
usersRouter
  .route('/contest-filter')
  .get(getContestFilter)
  .post(postContestFilter);

// usersRouter.get("/delete", deleteUser);

export default usersRouter;
