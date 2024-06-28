import endPoints from "../constants/endPoints";
import { IReview } from "../interfaces/commonInterfaces";
import ApiResponse from "../resources/enums/domain/entity/IApiResponse";
import { http } from "../util/http";


export const addReview = (id: string, data: Partial<IReview>): Promise<ApiResponse> => {
  return http.post(`${endPoints.review.ADD_REVIEW.replace(":bookId", id)}`, data);
};

export const getAllReviewsByBookId = (id: string): Promise<ApiResponse> => {
  return http.get(`${endPoints.review.GET_REVIEWS.replace(":bookId", id)}`);
};

export const editReview = (id: string, data: Partial<IReview>): Promise<ApiResponse> => {
  return http.patch(`${endPoints.review.EDIT_REVIEW.replace(":id", id)}`, data);
};

export const deleteReview = (id: string): Promise<ApiResponse> => {
  return http.delete(`${endPoints.review.DELETE_REVIEW.replace(":id", id)}`);
};