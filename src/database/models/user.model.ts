import { IUser } from '@interfaces/user.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';
import DBConnectService from '..';

const sequelize = DBConnectService.getInstance().getSequelizeClient();

class User extends Model<IUser> implements IUser {
  public id!: number;
  public email!: string;
  public walletAddress!: string;
  public username: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isValid(value: string) {
          if (value && value.length > 10) {
            throw new Error('username length should be less than 10 letters');
          }
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValid(value) {
          if (!value) {
            throw new Error('Email is required for this provider');
          }
        },
        isEmail: {
          msg: 'Email is not valid',
        },
      },
    },

    loginProvider: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('walletAddress', value.toLowerCase());
      },
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'users',
    underscored: true,
    indexes: [
      {
        fields: ['walletAddress'],
        name: 'idx_wallet',
      },
      {
        fields: ['walletAddress', 'loginProvider'],
        name: 'idx_wallet_provider',
        unique: true,
      },
    ],
  },
);

export default User;
