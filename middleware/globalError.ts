import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Global Error Handler:", err);

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}
