import express from "express";

import authProfile from "../../middleware/authorization";
import HandleErrors from "../../middleware/handleError";
import { validateBody, validatePathParams } from "../../middleware/validation";

import { logInValidationSchema, pathValidationSchema, signUpValidationSchema, updateValidationSchema } from "./schema";

import { logIn, signUp,deleteProfile, editProfile } from "./controller";

const userRoutes = express.Router();

userRoutes.post("/signup", validateBody(signUpValidationSchema), HandleErrors(signUp));
userRoutes.post("/login", validateBody(logInValidationSchema), HandleErrors(logIn));

userRoutes.patch("/:id", authProfile(), validatePathParams(pathValidationSchema), validateBody(updateValidationSchema), HandleErrors(editProfile));
userRoutes.patch("/delete-profile/:id", authProfile(), validatePathParams(pathValidationSchema), authProfile(), HandleErrors(deleteProfile));

export default userRoutes;