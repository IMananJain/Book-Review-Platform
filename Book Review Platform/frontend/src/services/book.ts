import endPoints from "../constants/endPoints";
import { IBook } from "../interfaces/commonInterfaces";
import ApiResponse from "../resources/enums/domain/entity/IApiResponse";
import { http } from "../util/http";


export const addBook = (data: Partial<IBook>): Promise<ApiResponse> => {
  return http.post(`${endPoints.book.ADD_BOOK}`, data);
};

export const getAllBooks = (): Promise<ApiResponse> => {
  return http.get(`${endPoints.book.GET_BOOKS}`);
};

export const getBookById = (id: string): Promise<ApiResponse> => {
  return http.get(`${endPoints.book.GET_BOOK.replace(":id", id)}`);
};

export const editBook = (id: string, data: Partial<IBook>): Promise<ApiResponse> => {
  return http.patch(`${endPoints.book.EDIT_BOOK.replace(":id", id)}`, data);
};

export const deleteBook = (id: string): Promise<ApiResponse> => {
  return http.delete(`${endPoints.book.DELETE_BOOK.replace(":id", id)}`);
};