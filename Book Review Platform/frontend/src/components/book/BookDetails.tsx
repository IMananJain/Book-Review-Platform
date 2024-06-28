import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BookDetails.css"
import { IBook, IReview } from "../../interfaces/commonInterfaces";
import { deleteBook, getBookById } from "../../services/book";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import routes from "../../constants/routes";
import ReviewList from "../review/ReviewList";
import AddReview from "../review/AddReview";

const BookDetails: React.FC = () => {
  const [book, setbook] = useState<IBook>();
  const [review, setReview] = useState<IReview>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        toastMessageError("Book ID is missing!");
        return;
      }

      const response = await getBookById(id);

      if (response && response.data && response.data.success) {
        const fetchedBook: IBook = response?.data?.data?.bookDetails;
        setbook(fetchedBook);
      }
      if (response && response.error && !response.error.success) {
        toastMessageError("Book Details is empty!");
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      toastMessageError("Book ID is missing!");
      return;
    }
    const response = await deleteBook(id);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully deleted book");
      navigate(routes.BOOK_LIST);
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };

  const handleReviewAdded = (newReview: IReview) => {
    setReview(newReview);
  };

  return (
    <div className="book-details-container">
      <div className="book-details">
        <h1>Book Details</h1>
        <div className="book-info">
          {book ? (
            <>
              <div className="book-card">
                <div className="book-image">
                  <img src={book?.image} alt="Book " />
                </div>
                <div className="book-description">
                  <h3> Title: {book.title}</h3>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                </div>
                <div className="book-actions">
                <Link to={routes.EDIT_BOOK.replace(":id", book._id!)}>
                  Edit Book
                </Link>
                <button onClick={handleDelete}>Delete Book</button>
              </div>
              </div>
              
              <div className="book-reviews">
                <div className="review-section">
                  <ReviewList review={review!} />
                </div>
              </div>
              <div className="add-review-section">
                <AddReview onReviewAdded={handleReviewAdded} />
              </div>
            </>
          ) : (
            <p>Book Details is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
