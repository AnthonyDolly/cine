import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError } from '../../errors/custom.error';

export class UserService {
  constructor() {}

  async getUsers() {
    return await UserModel.find();
  }

  async getUserById(id: string) {
    if (id.length !== 24) throw CustomError.badRequest('Invalid product id');

    const user = await UserModel.findById(id);

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }

  async updateUser(id: string, data: any) {
    return 'updateUser';
  }

  async deleteUser(id: string) {
    return 'deleteUser';
  }

  async getGuestUser() {
    const guestUser = await UserModel.findOne({ email: 'invitado@gmail.com' });

    if (!guestUser) throw CustomError.notFound('Guest user not found');

    return guestUser;
  }
}
