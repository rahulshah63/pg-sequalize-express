const fs = require('fs');
const { config } = require('dotenv');

config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    migrationStoragePath: 'sequelizeMeta.json',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
    },
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    migrationStoragePath: 'sequelizeMeta.json',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
