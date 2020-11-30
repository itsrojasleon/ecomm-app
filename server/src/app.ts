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
// import { indexProductRouter } from './routes/products/index';
import { createProductRouter } from './routes/products/new';
import { showProductRouter } from './routes/products/show';

// wishlist routes
// import { indexWishlistRouter } from './routes/wishlist/index';
// import { createWishlistRouter } from './routes/wishlist/new';

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
      if (
        ['http://localhost:8080', 'http://localhost:8081'].indexOf(origin) ===
        -1
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

// app.use(indexProductRouter);
app.use(createProductRouter);
app.use(showProductRouter);

// app.use(indexWishlistRouter);
// app.use(createWishlistRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
