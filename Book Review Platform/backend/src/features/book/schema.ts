import Joi from "joi";

import { BASE64_REGEX, GENRE, OBJECT_ID } from "../../utils/commonConstants";

export const createValidationSchema = Joi.object({
  title: Joi.string().required().min(3).max(30),
  image: Joi.string().required().pattern(BASE64_REGEX),
  author: Joi.string().required().min(2).max(30),
  description: Joi.string().required().min(10).max(200),
  genre: Joi.string().required().valid(...GENRE)
});

export const updateValidationSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  image: Joi.string().pattern(BASE64_REGEX).optional(),
  author: Joi.string().min(2).max(30).optional(),
  description: Joi.string().min(10).max(200).optional(),
  genre: Joi.string().valid(...GENRE).optional()
}).min(1);

export const pathValidationSchema = Joi.object({
  id: Joi.string().required().regex(OBJECT_ID),
});

