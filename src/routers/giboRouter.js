import express from 'express';
import {
  getUploadGibo,
  myGiboList,
  postUploadGibo,
  watchGibo,
} from '../controllers/giboController';

import { protectorMiddleware } from '../middleware';
const giboRouter = express.Router();

giboRouter
  .route('/upload')
  .all(protectorMiddleware)
  .get(getUploadGibo)
  .post(postUploadGibo);
giboRouter.get('/my-list', protectorMiddleware, myGiboList);
giboRouter.get('/:id([0-9a-f]{24})', watchGibo);

export default giboRouter;
