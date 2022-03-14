import express from 'express';
import { saveGibo } from '../controllers/usersController';
import { protectorMiddleware } from '../middleware';

const apiRouter = express.Router();

apiRouter.post('/save-gibo', protectorMiddleware, saveGibo);

export default apiRouter;
