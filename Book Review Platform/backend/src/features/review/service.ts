import { IReviewData } from "./interfaces";
import { IObjectId, IResponse } from "../../utils/commonInterfaces";
import Review from "./model";
import User from "../user/model";
import Book from "../book/model";

const response: IResponse = {
  message: "",
  success: false,
};

class ReviewService {
  static async createReview(data: Partial<IReviewData>): Promise<IResponse> {
    const userExists = await User.findById( data.userId );
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      response.data = null;
      return response;
    }

    const bookExists = await Book.findById( data.bookId);
    if (!bookExists) {
      response.message = "Book does not exists";
      response.success = false;
      response.data = null;
      return response;
    }
    
    const newReview = new Review({
      rating: data.rating,
      comment: data.comment,
      userId: data.userId,
      bookId: data.bookId
    });

    const savedReview = await newReview.save();
    if (!savedReview) {
      response.message = "Book or User does not exists";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Review created successfully";
    response.success = true;
    response.data = {savedReview};

    return response;
  }

  static async getReviewsByBookId(data: IObjectId): Promise<IResponse> {
    const bookWithReviews = await Review.find({bookId:data.id},{__v:0,createdAt:0,updatedAt:0});
    if (!bookWithReviews) {
      response.message = "Failed to get book and it's related reviews";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Found Book and it's related reviews";
    response.success = true;
    response.data = {bookWithReviews};
    return response;
  }

  static async editReviewById(data: Partial<IReviewData>): Promise<IResponse> {
    const reviewDetails = await Review.findByIdAndUpdate(data.id, data, { new: true, fields: { __v: 0, createdAt: 0, updatedAt: 0 } });

    if (!reviewDetails) {
      response.message = "Review not found or could not be updated";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Review updated successfully";
    response.data = { reviewDetails };
    response.success = true;
    return response;
  }

  static async deleteReviewById(data:IObjectId): Promise<IResponse> {
    const deletedReview = await Review.findByIdAndDelete(data.id);
    if (!deletedReview) {
      response.message = "Review cannot be deleted";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Review deleted successfully";
    response.success = true;
    response.data = null;
    return response;
  }
}

export default ReviewService;
