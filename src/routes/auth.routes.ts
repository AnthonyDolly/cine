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

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesión y obtener un JWT
     *     description: Inicia sesión y recibe un token JWT válido.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso. Devuelve un token JWT.
     *         content:
     *           application/json:
     *             example:
     *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     *       400:
     *         description: Credenciales inválidas. La solicitud contiene datos incorrectos.
     *       401:
     *         description: No autorizado. Las credenciales proporcionadas no son válidas.
     */
    router.post('/login', controller.loginUser);

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     description: Registra un nuevo usuario y envía un correo electrónico de verificación.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *              email:
     *                type: string
     *              phone:
     *                type: string
     *              dni:
     *                type: string
     *              password:
     *               type: string
     *
     *     responses:
     *       200:
     *         description: Registro exitoso. Devuelve un mensaje de éxito.
     *         content:
     *           application/json:
     *             example:
     *               message: "User registered successfully"
     *       400:
     *         description: Datos inválidos. La solicitud contiene datos incorrectos.
     */
    router.post('/register', controller.registerUser);

    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}
