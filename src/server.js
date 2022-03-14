import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './middleware';
import globalRouter from './routers/globalRouter';
import usersRouter from './routers/usersRouter';
import manageRouter from './routers/manageRouter';
const app = express();

const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COKKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use('/', globalRouter);
app.use('/users', usersRouter);
app.use('/manage', manageRouter);
app.use('/assets', express.static('assets'));

export default app;
