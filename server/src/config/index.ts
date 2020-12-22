import { devConfig } from './dev';
import { prodConfig } from './prod';

interface EnvVariables {
  JWT_KEY: string;
  PG_DATABASE: string;
  PG_USER: string;
  PG_PASSWORD: string;
  PG_HOST: string;
  AWS_BUCKET_NAME: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  STRIPE_API_KEY: string;
}

let config: EnvVariables;

if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
} else {
  config = devConfig;
}

export { config };
