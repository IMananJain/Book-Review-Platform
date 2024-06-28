import { Request, Response } from "express";
import { Types } from "mongoose";

import BookService from "./service";

export const createBook = async (req: Request,res: Response) => {
  try {
    const body = {
        ...req.body,
    };
    const data = await BookService.createBook(body);

    if (data.success) {
      res.status(201).json({
        ...data,
        code: 201,
      });
    } else {
      res.status(400).json({
        ...data,
        code: 400,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const data = await BookService.getAllBooks();

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(409).json({
        ...data,
        code: 409,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.id),
    };
    const data = await BookService.getBookById(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(409).json({
        ...data,
        code: 409,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const editBookById = async (req: Request,res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.id),
      ...req.body,
    };
    const data = await BookService.editBookById(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.id)
    };
    const data = await BookService.deleteBookById(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};