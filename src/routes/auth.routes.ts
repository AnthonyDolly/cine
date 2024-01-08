import { Router } from 'express';
import { AuthService } from '../modules/auth/auth.service';
import { envs } from '../config/envs';
import { AuthController } from '../modules/auth/auth.controller';
import { EmailService } from '../modules/users/email.service';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);

    // Definir las rutas
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}