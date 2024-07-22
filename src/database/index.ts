import env from '@/utils/env';
import { logger } from '@/utils/logger';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';

class DBConnectService {
  private isConnected: boolean;
  static instance: DBConnectService = null;
  private sequelize: Sequelize = null;

  constructor() {
    this.init();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DBConnectService();
    }
    return this.instance;
  }

  public async init() {
    const db = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
      host: env.DB_HOST,
      port: env.DB_PORT,
      dialect: 'postgres',
      logging: console.log,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 5000,
        idle: 10000,
      },
    });
    this.sequelize = db;
    try {
      await db.authenticate();
      logger.info('Connected to Sequelize database');
    } catch (error) {
      logger.error(`Unable to Connect: ${error}`);
      throw Error(error);
    }
  }

  public getSequelizeClient() {
    return this.sequelize;
  }
}

export default DBConnectService;
