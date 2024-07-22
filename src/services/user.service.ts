import userModel from '@/database/models/user.model';
import { HttpException } from '@/exceptions/HttpException';
import { ICreateUserPayload } from '@/interfaces/user.interface';

import { Sequelize } from 'sequelize';

class UserService {
  private user = userModel;

  public get = async (walletAddress: string) => {
    if (!walletAddress) {
      throw new HttpException(400, 'Missing userId');
    }

    const playerData = await this.user.findOne({ where: { walletAddress: walletAddress.toLowerCase() } });

    if (!playerData) {
      throw new HttpException(404, 'User not found');
    }

    if (!playerData) {
      throw new HttpException(400, "Player dta doen't exist");
    }

    return { name: playerData.username, walletAddress: playerData.walletAddress, email: playerData.email };
  };

  public create = async (payload: ICreateUserPayload) => {
    if (!payload) {
      throw new HttpException(400, 'Missing userId');
    }

    const { walletAddress, signature, email } = payload;

    const user = await this.user.findOne({
      where: {
        walletAddress: walletAddress.toLowerCase(),
      },
    });

    if (user) {
      throw new HttpException(422, 'User already exists');
    }

    const newUser = new this.user(payload);
    await newUser.save();

    return newUser;
  };

}

export default UserService;
