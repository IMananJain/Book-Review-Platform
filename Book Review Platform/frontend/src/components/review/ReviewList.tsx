import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../state_management/reducers";
import { IReview } from "../../interfaces/commonInterfaces";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import { deleteReview, getAllReviewsByBookId } from "../../services/review";
import routes from "../../constants/routes";

interface ReviewListProps {
  review: IReview;
}

const ReviewList: React.FC<ReviewListProps> = ({ review }) => {
  const { authData } = useSelector((state: RootState) => state.AuthReducer);
  const { id } = useParams<{ id: string }>();
  const [reviewList, setReviewList] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchedReviewList = async () => {
      if (!id) {
        toastMessageError("Book ID is missing!");
        return;
      }
      const response = await getAllReviewsByBookId(id);
      if (response && response.data && response.data.success) {
        const fetchedReviewList: IReview[] = response?.data?.data?.bookWithReviews;
        setReviewList(fetchedReviewList);
      }
      if (response && response.error && !response.error.success) {
        toastMessageError("Review List is empty!");
      }
    };
    fetchedReviewList();
  }, [id]);

  useEffect(() => {
    if (review) {
      setReviewList((reviewList) => [...reviewList, review]);
    }
  }, [review]);

  const canEditOrDelete = (userId: string): boolean => {
    return !!authData && authData._id === userId;
  };

  const handleDelete = async (id: string) => {
    const response = await deleteReview(id);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully deleted review");
      const updatedReviewList = reviewList!.filter(review => review._id !== id);
      setReviewList(updatedReviewList);
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };
  const renderStars = (rating: number) => {
    const fullStar = '★';
    const emptyStar = '☆';
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
  };
  
  return (
    <div>
      <h1>Review List</h1>
      <div>
        {reviewList && reviewList.length > 0 ? (
          <ol>
            {reviewList.map((review: IReview, index: number) => (
              <li key={index}>
                <p><strong>Comment:</strong> {review.comment}</p>
                <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                {canEditOrDelete(review.userId!) ? (
                <>
                  <div>
                    <Link to={routes.EDIT_REVIEW.replace(":id", review._id!).replace(":bookId",id!)}>Edit Review</Link>
                  </div>
                  <div>
                    <button onClick={() =>handleDelete(review._id!)}>Delete Review</button>
                  </div>
                </>
              ) : (
                <></>
              )}
              </li>
          ))}
          </ol>
        ) : (
          <p>Review List is empty!</p>
        )}
      </div>
    </div>
  );
};
export default ReviewList;
