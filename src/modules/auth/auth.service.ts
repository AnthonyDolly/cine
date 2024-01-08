import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError } from '../../errors/custom.error';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { EmailService } from '../users/email.service';

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      await this.sendEmailConfirmation(user.email);

      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token)
        throw CustomError.internalServerError('Error generating token');

      return {
        user,
        token,
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest('Invalid credentials');

    const passwordMatch = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!passwordMatch) throw CustomError.badRequest('Invalid credentials');

    if (!user.emailVerified) throw CustomError.badRequest('Email not verified');

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServerError('Error generating token');

    return {
      user,
      token,
    };
  }

  private sendEmailConfirmation = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServerError('Error generating token');

    const url = `${process.env.WEB_SERVICE_URL}/auth/validate-email/${token}`;

    const htmlBody = `
      <h1>Click on the link below to validate your email</h1>
      <a href="${url}">${url}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody,
    };

    const emailSent = await this.emailService.sendEmail(options);

    if (!emailSent)
      throw CustomError.internalServerError('Error sending email');

    return true;
  };

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.verifyToken(token);

    if (!payload) throw CustomError.badRequest('Invalid token');

    const { email } = payload as { email: string };

    if (!email) throw CustomError.badRequest('Invalid token');

    const user = await UserModel.findOne({ email });

    if (!user) throw CustomError.badRequest('Invalid token');

    user.emailVerified = true;

    await user.save();

    return true;
  }
}
