import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/users/currentuser';
import { signupRouter } from './routes/users/signup';
import { signinRouter } from './routes/users/signin';
import { signoutRouter } from './routes/users/signout';
import { NotFoundError } from './errors/not-found';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8082'].indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), true);
      }
      return callback(null, true);
    }
  })
);
app.use(cookieSession({ signed: false }));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
