import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(json());
app.use(cookieSession({ signed: false }));

export { app };
