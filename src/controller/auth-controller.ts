// controller/auth-controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET_KEY } from '../config';
import { TestService } from '../service/test-service';

const SECRET_KEY = JWT_SECRET_KEY;

class AuthController {

    private service: TestService;

    constructor() {
        this.service = new TestService();
    }

    // Login: compara contra DB y devuelve JWT
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email y contraseña requeridos'});
            return;
        }

        const user = await this.service.authenticate(email, password);
        if (!user) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }

        // Firmar JWT con datos mínimos
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token, user }); // user no contiene password
    }
}

export { AuthController };