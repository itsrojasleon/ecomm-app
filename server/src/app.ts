import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// auth routes
import { currentUserRouter } from './routes/users/currentuser';
import { signupRouter } from './routes/users/signup';
import { signinRouter } from './routes/users/signin';
import { signoutRouter } from './routes/users/signout';

// product routes
import { indexProductsRouter } from './routes/products/index';
import { createProductsRouter } from './routes/products/new';
import { showProductsRouter } from './routes/products/show';
import { updateProductsRouter } from './routes/products/update';

// wishlist routes
import { createWishlistRouter } from './routes/wishlist/new';
import { indexWishlistRouter } from './routes/wishlist';

import { NotFoundError } from './errors/not-found';
import { errorHandler } from './middlewares/error-handler';
import { updateUserRouter } from './routes/users/update';
import { indexUserRouter } from './routes/users';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        [
          'http://localhost:8080',
          'http://localhost:8081',
          'http://localhost:8082',
          'http://localhost:8083',
          'http://localhost:8084'
        ].indexOf(origin) === -1
      ) {
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
app.use(indexUserRouter);
app.use(updateUserRouter);

app.use(indexProductsRouter);
app.use(createProductsRouter);
app.use(showProductsRouter);
app.use(updateProductsRouter);

app.use(indexWishlistRouter);
app.use(createWishlistRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
