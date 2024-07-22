import { NextFunction, Request, Response } from 'express';

import UserService from '@/services/user.service';

class UserController {
  private userService = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.params;
      const user = await this.userService.get(walletAddress);

      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  public saveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const user = await this.userService.create(payload);

      res.send(user);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
