import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../services/book";
import { IBook } from "../../interfaces/commonInterfaces";
import { toastMessageError } from "../utilities/commonToastMessage";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";

const BookList: React.FC = () => {
  const [bookList, setBookList] = useState<IBook[]>([]);
  
  useEffect(() => {
    const fetchBookList = async () => {

      const response = await getAllBooks();
      
      if (response && response.data && response.data.success) {
        const fetchedBookList: IBook[] = response?.data?.data?.bookList;
        setBookList(fetchedBookList);
      }
      if (response && response.error && !response.error.success) {
        toastMessageError("Book List is empty!");
      }
    };
    fetchBookList();
  }, []);

  return (
    <div  className="book-list-container">
      <h1>Book List</h1>
      <div className="books-wrapper">
        {bookList.length > 0 ? (
          <div className="book-list">
            {bookList.map((book: IBook, index: number) => (
              <div key={index} className="book-item">
                <Link to={routes.BOOK_DETAILS.replace(":id", book._id!)} className="book-title">
                  <h3>{book.title}</h3>
                </Link>
                <img src={book?.image} alt="Book Cover" className="book-image" />
              </div>
            ))}
          </div>
        ) : (
          <p>Book List is empty!</p>
        )}
      </div>
    </div>
  );
};
export default BookList;
