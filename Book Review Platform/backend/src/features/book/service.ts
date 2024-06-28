import { IBook, IBookData } from "./interfaces";
import { IObjectId, IResponse } from "../../utils/commonInterfaces";

import Book from "./model";

const response: IResponse = {
  message: "",
  success: false,
};

class BookService {
  static async createBook(data: IBook): Promise<IResponse> {
    const bookExists = await Book.findOne({ title: data.title });
    if (bookExists) {
      response.message = "Book already exists";
      response.success = false;
      response.data = null;
      return response;
    }

    const newBook = new Book({
      title: data.title,
      image: data.image,
      author: data.author,
      description: data.description,
      genre: data.genre,
    });

    await newBook.save();

    const savedBook = await Book.findOne(
      { title: data.title },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    response.message = "Book created successfully";
    response.success = true;
    response.data = savedBook;

    return response;
  }

  static async getBookById(data: IObjectId): Promise<IResponse> {
    const bookDetails = await Book.findById(data.id,{__v:0,createdAt:0,updatedAt:0});
    if ( !bookDetails ) {
      response.message = "Failed to Found book and it's related reviews";
      response.success = false;
      response.data = null;
      return response;
    }
    
    response.message = "Found book and it's related reviews",
    response.success = true;
    response.data = {bookDetails};
    return response;
  }

  static async getAllBooks(): Promise<IResponse> {
    const bookList = await Book.find();
    if (!bookList) {
      response.message = "Books does not exists";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Books found successfully";
    response.success = true;
    response.data = { bookList };
    return response;
  }

  static async editBookById(data: IBookData): Promise<IResponse> {
    const bookExists = await Book.findOne({ title: data.title, _id: { $ne: data.id } });
    if (bookExists) {
      response.message = "Book already exists with same title";
      response.success = false;
      response.data = null;
      return response;
    }

    const bookDetails = await Book.findByIdAndUpdate(data.id, data, { new: true, fields: { __v: 0, createdAt: 0, updatedAt: 0 } });

    if (!bookDetails) {
      response.message = "Book not found or could not be updated";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Book updated successfully";
    response.data = { bookDetails };
    response.success = true;
    return response;
  }
  
  static async deleteBookById(data: IObjectId): Promise<IResponse>{
    const deletedBook = await Book.findByIdAndDelete(data.id);

    if (!deletedBook) {
      response.message = "Books cannot be updated";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "Book deleted successfully";
    response.success = true;
    response.data = null;
    return response;
  }
}

export default BookService;
