import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
  public static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      error: err.message || 'Internal Server Error',
    });
  }
}

export default ErrorHandler;
