import express from "express";

import authProfile from "../../middleware/authorization";
import HandleErrors from "../../middleware/handleError";
import { validateBody, validatePathParams } from "../../middleware/validation";

import { createValidationSchema, pathValidationSchema, updateValidationSchema } from "./schema";

import { createBook, deleteBookById, editBookById, getAllBooks, getBookById } from "./controller";

const bookRoutes = express.Router();

bookRoutes.post("/", authProfile(), validateBody(createValidationSchema), HandleErrors(createBook));

bookRoutes.get("/", authProfile(), HandleErrors(getAllBooks));
bookRoutes.get("/:id", authProfile(), validatePathParams(pathValidationSchema), HandleErrors(getBookById));

bookRoutes.patch("/:id", authProfile(), validatePathParams(pathValidationSchema), validateBody(updateValidationSchema), HandleErrors(editBookById));

bookRoutes.delete("/:id", authProfile(), validatePathParams(pathValidationSchema), HandleErrors(deleteBookById));

export default bookRoutes;