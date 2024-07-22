import { Router } from 'express';

import UserController from '@/controllers/user.controller';
import { Routes } from '@/interfaces/routes.interface';
import { apiAuthMiddleware } from '@/middlewares/auth.middleware';

class UserRoute implements Routes {
  public path = '/v1/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:walletAddress`, this.userController.getUser);
    this.router.post(`${this.path}`, this.userController.saveUser);
  }
}

export default UserRoute;
