import express from 'express';
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  notices,
  noticeView,
  logout,
  dashboard,
  recorder,
} from '../controllers/globalController';

const globalRouter = express.Router();

globalRouter.get('/', home);

globalRouter.route('/join').get(getJoin).post(postJoin);
globalRouter.route('/login').get(getLogin).post(postLogin);
globalRouter.get('/logout', logout);
// introRouter.get("/intro-site", introSite);
// introRouter.get("/intro-teacher", introTeacher);
globalRouter.get('/notices', notices);
globalRouter.get('/notice/:id([0-9a-f]{24})', noticeView);
// globalRouter.get("/noticeBoard", noticeBoard);
globalRouter.get('/dashboard', dashboard);
globalRouter.get('/recorder', recorder);

export default globalRouter;
