import { config } from 'dotenv';
import { bool, cleanEnv, num, port, str } from 'envalid';

config();

const env = cleanEnv(process.env, {
  // Place default values values on top and required below for better visibility
  NODE_ENV: str({ devDefault: 'development' }),
  PORT: port({ default: 3000 }),
  LOG_FORMAT: str({ default: 'combined' }),
  LOG_DIR: str({ default: 'logs' }),
  ORIGIN: str({ default: '*' }),
  CREDENTIALS: bool({ default: true }),
  API_KEY_VALUE: str({ default: 'anichess-v1' }),
  DB_URI: str(),

  //DB
  DB_USERNAME: str({ default: '' }),
  DB_PASSWORD: str({ default: '' }),
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: port({ default: 27017 }),
  DB_DATABASE: str({ default: 'development' }),

  // AWS env
  AWS_REGION: str({ devDefault: '' }),
  AWS_KEY_ID: str({ devDefault: '' }),

  // chain env
  RPC_URL: str({ default: '' }),
  TOKEN_CLAIM_CONTRACT_ADDRESS: str({ default: '' }),
  CHAIN_ID: num({ default: 80001 }),

  // zealy env
  ZEALY_API_KEY: str(),
  ZEALY_SUBDOMAIN: str(),
  MAILERLITE_BEARER_TOKEN : str(),
  MAILERLITE_BASE_URL : str(),
  MAILERLITE_GROUP_ID : str()
});

export default env;
