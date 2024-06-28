import Joi from "joi";

import { OBJECT_ID } from "../../utils/commonConstants";

export const createValidationSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
  userId: Joi.string().required().regex(OBJECT_ID)
});

export const updateValidationSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().optional(),
  userId: Joi.string().required().regex(OBJECT_ID),
  bookId: Joi.string().required().regex(OBJECT_ID)
}).min(3);

export const pathValidationSchema = Joi.object({
  bookId: Joi.string().regex(OBJECT_ID),
  id: Joi.string().regex(OBJECT_ID),
}).min(1);

