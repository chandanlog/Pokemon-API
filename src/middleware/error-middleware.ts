import { ApiError } from "interfaces/interfaces.common";
import { Request, Response, NextFunction } from "express";

export const errorResponse = (
  error: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(error.statusCode).json({
    success: false,
    data: error.data,
    message: error.message,
  });
};
