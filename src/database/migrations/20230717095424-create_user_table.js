'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const PROVIDERS = {
      GOOGLE: 'google',
      FACEBOOK: 'facebook',
      DISCORD: 'discord',
      TWITTER: 'twitter',
      METAMASK: 'metamask',
      WALLET_CONNECT_V1: 'wallet-connect-v1',
      WALLET_CONNECT_V2: 'wallet-connect-v2',
    };

    const NON_EMAIL_PROVIDERS = [PROVIDERS.METAMASK, PROVIDERS.WALLET_CONNECT_V1, PROVIDERS.WALLET_CONNECT_V2];

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isValid(value) {
            if (!NON_EMAIL_PROVIDERS.includes(this.loginProvider) && !value) {
              throw new Error('Email is required for this provider');
            }
          },
          isEmail: {
            msg: 'Email is not valid',
          },
        },
      },
      login_provider: {
        type: Sequelize.ENUM(Object.values(PROVIDERS)),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      wallet_address: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('wallet_address', value.toLowerCase());
        },
        validate: {
          notEmpty: true,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('users', ['wallet_address', 'login_provider'], {
      type: 'UNIQUE',
      name: 'idx_wallet_provider',
    });

    await queryInterface.addIndex('users', ['wallet_address'], {
      type: 'FULLTEXT',
      name: 'idx_wallet',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  },
};
