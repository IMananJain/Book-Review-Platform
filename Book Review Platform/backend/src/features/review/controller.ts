import { Request, Response } from "express";
import { Types } from "mongoose";
import ReviewService from "./service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const body = {
      bookId: new Types.ObjectId(req.params.bookId),
      rating: req.body.rating,
      comment: req.body.comment,
      userId: new Types.ObjectId(req.body.userId)
    };

    const data = await ReviewService.createReview(body);

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

// export const getAllReviews = async (req: Request, res: Response) => {
//   try {
//     const data = await ReviewService.getAllReviews();

//     if (data.success) {
//       res.status(200).json({
//         ...data,
//         code: 200,
//       });
//     } else {
//       res.status(409).json({
//         ...data,
//         code: 409,
//       });
//     }
//   } catch (error: any) {
//     const statusCode = error.output?.statusCode ?? 500;
//     const errorMessage = error.message ?? "Internal Server Error";
//     res.status(statusCode).json({ error: errorMessage });
//   }
// };

export const getReviewsByBookId = async (req: Request, res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.bookId),
    };
    const data = await ReviewService.getReviewsByBookId(body);

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

export const editReviewById = async (req: Request,res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.id),
      rating: req.body.rating,
      comment: req.body.comment,
      bookId: new Types.ObjectId(req.body.bookId),
      userId: new Types.ObjectId(req.body.userId)
    };
    const data = await ReviewService.editReviewById(body);

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

// export const alterDepartment = async (req: Request,res: Response) => {
//   try {
//     const body = {
//         ...req.body,
//     };
//     const data = await ReviewService.alterDepartment(body);

//     if (data.success) {
//       res.status(200).json({
//         ...data,
//         code: 200,
//       });
//     } else {
//       res.status(404).json({
//         ...data,
//         code: 404,
//       });
//     }
//   } catch (error: any) {
//     const statusCode = error.output?.statusCode ?? 500;
//     const errorMessage = error.message ?? "Internal Server Error";
//     res.status(statusCode).json({ error: errorMessage });
//   }
// };

export const deleteReviewById = async (req: Request,res: Response) => {
  try {
    const body = {
      id: new Types.ObjectId(req.params.id),
    };
    const data = await ReviewService.deleteReviewById(body);

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