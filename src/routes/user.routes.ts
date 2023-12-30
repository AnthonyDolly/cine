import { Router } from 'express';
import { UserService } from '../modules/users/user.service';
import { UserController } from '../modules/users/user.controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const userController = new UserController(userService);

    // Define routes
    router.get('/', userController.getUsers);
    router.get('/:id', userController.getUserById);
    router.post('/', userController.createUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);

    return router;
  }
}
