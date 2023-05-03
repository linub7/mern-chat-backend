import { SignInController } from '@auth/controllers/signin';
import { SignoutController } from '@auth/controllers/signout';
import { SignUpController } from '@auth/controllers/signup';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', SignUpController.prototype.create);
    this.router.post('/signin', SignInController.prototype.read);

    return this.router;
  }

  public signoutRoute(): Router {
    this.router.get('/signout', SignoutController.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
