import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes';
import ErrorHandler from './errorHandler';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Routes
app.use('/identify', contactRoutes);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.handle(err, req, res, next);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



