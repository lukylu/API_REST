import { Request, Response } from 'express';
import { TestService } from '../service/test-service';

class TestController {

    private service: TestService;

    constructor() {
        this.service = new TestService();
    }

    /**
     *Get a test response from the server
     * 
     * @param req - Express request objetc.
     * @param res - Express response object.
     * @returns JSON test response or an error response.
     */
    async getTestResponse(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.service.getTestResponse();
            if (response === null) {
                res.status(404).json({ error: 'Requested response does not exist' });
                return; // Solo se retorna en ese caso
            }
            res.status(200).json(response);
        }   catch (error) {
            res.status(500).json({ error: 'Unexpected Api error' });
        }
    }

    // EN DUDA

    // api/src/controller/test-controller.ts
    async getOne(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const data = await this.service.getOne(id as string);

        if (!data) {
            res.status(404).json({
                error: 'Usuario no encontrado',
                message: `No se encontró un usuario con ID ${id}`
            });
            return;
        }

        res.status(200).json({
            succes: true,
            data: data
        });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudo obtener el usuario'
        });
    }
}

// api/src/controller/test-controller.ts
    async create(req: Request, res: Response): Promise<void> {
        try {
            const created = await this.service.create(req.body);
            if(!created) {
                res.status(400).json({ error: 'Bad Syntax' });
                return;
            }
            res.status(201).json(created);
        } catch {
            res.status(500).json({ error: 'Unexpected API error' });
        }
    }

    // api/src/controller/test-controller.ts
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updated = await this.service.update(id as string, req.body); //Preguntar si 'as string' está bien {recomendación por ia}
            if (!updated) {
                res.status(404).json({ error: 'Not found' });
                return;
            }
            res.status(200).json(updated);
        } catch {
            res.status(500).json({ error: 'Unexpected API error' });
        }
    }

    // api/src/controller/test-controller.ts
    async delete( req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.service.delete(id as string);
            if (!deleted) {
                res.status(404).json({ error: 'Not found' });
                return;
            }
            res.status(204).send();
        } catch {
            res.status(500).json({ error: 'Unexpected API error' });
        }
    }

}

export { TestController };