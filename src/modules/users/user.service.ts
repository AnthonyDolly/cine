import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError } from '../../errors/custom.error';
import { CreateUserDto } from './dtos/create-user.dto';

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

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await UserModel.findOne({ email: createUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(createUserDto);

      user.password = bcryptAdapter.hash(createUserDto.password);

      return await user.save();
    } catch (error) {
      console.log(error);
      throw 'Error creating user';
    }
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
