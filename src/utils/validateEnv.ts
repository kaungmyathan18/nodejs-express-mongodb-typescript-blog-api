import { cleanEnv, num, str } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: num(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str(),
    DATABASE_URL: str(),
    NODE_ENV: str({
      choices: ['development', 'test', 'production', 'staging'],
    }),
  });
}
