import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "interfaces/interfaces.common";
import { errorResponse } from "./error-middleware";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: ApiError) => {
      errorResponse(error, req, res, next);
    });
  };
};
