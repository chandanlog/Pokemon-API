import { NextFunction } from "connect";
import { Request, Response } from "express";

export const verify = (req: Request, res: Response, next: NextFunction) => {
  next();
};
