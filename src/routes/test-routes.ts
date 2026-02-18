import express from 'express';
import { TestController } from '../controller/test-controller';

const router = express.Router();
const controller = new TestController();

// Llamada GET genérica al controlador
router.get('/user', (req, res) => controller.getTestResponse(req, res));

// api/src/routes/test-routes.ts - Para filtrar por id de usuarios
router.get('/user/:id', (req, res) => controller.getOne(req, res));

// api/src/routes/test-routes.ts
router.post('/users', (req, res) => controller.create(req, res));

// api/src/routes/test-routes.ts
router.put('/users/:id', (req, res) => controller.update(req, res));

// api/src/routes/test-routes.ts
router.delete('/users/:id', (req, res) => controller.delete(req, res));

export default router;