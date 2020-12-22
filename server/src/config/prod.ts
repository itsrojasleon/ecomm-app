export const prodConfig = {
  // JWT stuff
  JWT_KEY: process.env.JWT_KEY!,
  // Postgres stuff
  PG_DATABASE: process.env.PG_DATABASE!,
  PG_USER: process.env.PG_USER!,
  PG_PASSWORD: process.env.PG_PASSWORD!,
  PG_HOST: process.env.PG_HOST!,
  // AWS stuff
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  // Stripe stuff
  STRIPE_API_KEY: process.env.STRIPE_API_KEY!
};
