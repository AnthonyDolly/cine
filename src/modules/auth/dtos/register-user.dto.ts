import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly dni: number,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, phone, dni, password } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Invalid email'];
    if (!phone) return ['Missing phone'];
    if (!regularExps.phone.test(phone)) return ['Invalid phone'];
    if (!dni) return ['Missing dni'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password must be at least 6 characters'];

    const registerUserDto = new RegisterUserDto(name, email, phone, dni, password);

    return [undefined, registerUserDto];
  }
}
