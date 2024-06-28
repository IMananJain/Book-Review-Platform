import express from "express";

import authProfile from "../../middleware/authorization";
import HandleErrors from "../../middleware/handleError";
import { validateBody, validatePathParams } from "../../middleware/validation";

import { createValidationSchema, pathValidationSchema, updateValidationSchema } from "./schema";

import { createReview, deleteReviewById, editReviewById, getReviewsByBookId } from "./controller";

const reviewRoutes = express.Router();

reviewRoutes.post("/books/:bookId/reviews", authProfile(), validatePathParams(pathValidationSchema), validateBody(createValidationSchema), HandleErrors(createReview));

reviewRoutes.get("/books/:bookId/reviews", authProfile(), validatePathParams(pathValidationSchema), HandleErrors(getReviewsByBookId));

reviewRoutes.patch("/reviews/:id", authProfile(), validatePathParams(pathValidationSchema), validateBody(updateValidationSchema), HandleErrors(editReviewById));

reviewRoutes.delete("/reviews/:id", authProfile(), validatePathParams(pathValidationSchema), HandleErrors(deleteReviewById));

export default reviewRoutes;