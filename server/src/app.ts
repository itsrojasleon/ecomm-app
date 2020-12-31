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
import { updateProductsRouter } from './routes/products/update';
import { showProductsRouter } from './routes/products/show';
import { searchProductsRouter } from './routes/products/search';
import { topProductsRouter } from './routes/products/top';

// wishlist routes
import { createWishlistRouter } from './routes/wishlist/new';
import { indexWishlistRouter } from './routes/wishlist';

// user routes
import { updateUserRouter } from './routes/users/update';
import { indexUserRouter } from './routes/users';

// order routes
import { newOrderRouter } from './routes/orders/new';
import { indexOrdersRouter } from './routes/orders/index';

// order details routes
import { indexOrderDetailsRouter } from './routes/order-details/index';
import { newOrderDetailsRouter } from './routes/order-details/new';
import { cancelOrderRouter } from './routes/orders/cancel';

// cart routes
import { indexCartRouter } from './routes/cart';
import { newCartRouter } from './routes/cart/new';
import { increaseCartRouter } from './routes/cart/increase';
import { decreaseCartRouter } from './routes/cart/decrease';
import { deleteCartRouter } from './routes/cart/delete';

// review routes
import { indexReviewsRouter } from './routes/reviews/index';
import { newReviewRouter } from './routes/reviews/new';
import { updateReviewRouter } from './routes/reviews/update';
import { deleteReviewRouter } from './routes/reviews/delete';

// upload routes
import { uploadRouter } from './routes/upload/new';

import { NotFoundError } from './errors/not-found';
import { errorHandler } from './middlewares/error-handler';
import { createPaymentsRouter } from './routes/payments/new';

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
          'http://localhost:8084',
          'http://localhost:8085',
          'http://localhost:8086',
          'http://localhost:8087'
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
app.use(searchProductsRouter);
app.use(topProductsRouter);

app.use(indexWishlistRouter);
app.use(createWishlistRouter);

app.use(indexOrdersRouter);
app.use(newOrderRouter);
app.use(cancelOrderRouter);

app.use(indexOrderDetailsRouter);
app.use(newOrderDetailsRouter);

app.use(newCartRouter);
app.use(indexCartRouter);
app.use(deleteCartRouter);
app.use(increaseCartRouter);
app.use(decreaseCartRouter);

app.use(indexReviewsRouter);
app.use(newReviewRouter);
app.use(updateReviewRouter);
app.use(deleteReviewRouter);

app.use(createPaymentsRouter);

app.use(uploadRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
