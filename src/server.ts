import http from 'http';
import express, { Express, Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import routes from './routes/test-routes';
import authRoutes from './routes/auth-routes';
import { authenticateToken } from './middleware/auth';
import cors from 'cors';

const app = express();

// Activate CORS for UI access
app.use(cors({
    origin: [
        'http://localhost:4200',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Apply colors to loggin
morgan.token('methodColored', (req: Request) => {
    const method = req.method;
    switch (method) {
        case 'GET':
            return chalk.green(method);
        case 'POST':
            return chalk.blue(method);
        case 'PUT':
            return chalk.red(method);
        case 'DELETE':
            return chalk.magenta(method);
        case 'PATCH':
            return chalk.white(method);
    }
});

app.use(morgan(':methodColored :url :status :res[content-length] - :response-time ms'));

// Request parsing
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Public routes
app.use('/', authRoutes);

// Private routes 
/** Con protección de autenticación de usuario
app.use('/', authenticateToken, routes);
*/

app.use('/', routes);

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    next(error);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: err.message
    });
});

// Server
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

// CAPAS: server < routes < controller < service < repository < BBDD