import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CustomError } from '../../errors/custom.error';

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getUsers = async (req: Request, res: Response) => {
    this.userService
      .getUsers()
      .then((users) => res.status(200).json(users))
      .catch((error) => this.handleError(error, res));
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .getUserById(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  updateUser = async (req: Request, res: Response) => {
    res.json('updateUser');
  };

  deleteUser = async (req: Request, res: Response) => {
    res.json('deleteUser');
  };
}
