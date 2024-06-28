import Joi from "joi";

import { BASE64_REGEX, OBJECT_ID, PASSWORD_REGEX } from "../../utils/commonConstants";

export const signUpValidationSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(PASSWORD_REGEX),
    image: Joi.string().required().pattern(BASE64_REGEX)
  }),
  Joi.object({
    googleCredential: Joi.string().required()
  }),
  Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    image: Joi.string().required().uri()
  })
);

export const logInValidationSchema = Joi.alternatives().try(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(PASSWORD_REGEX)
  }),
  Joi.object({
    googleCredential: Joi.string().required()
  }),
  Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    image: Joi.string().required().uri()
  })
);

export const updateValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  image: Joi.string().required().pattern(BASE64_REGEX).optional()
}).min(1);

export const pathValidationSchema = Joi.object({
  id: Joi.string().required().regex(OBJECT_ID),
});