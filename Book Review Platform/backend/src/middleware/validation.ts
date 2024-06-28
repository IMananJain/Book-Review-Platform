import { Request, Response, NextFunction } from "express";
import { Schema,ObjectSchema } from "joi";

export const validateBody = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validatePathParams = (pathSchema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = pathSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateQueryParams = (querySchema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};