import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IReview } from "../../interfaces/commonInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers";
import { useParams } from "react-router-dom";
import { addReviewValidationSchema } from "../utilities/validationSchema";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import { addReview } from "../../services/review";
interface AddReviewProps {
  onReviewAdded: (review: IReview) => void; // Callback to notify parent component
}

const AddReview: React.FC<AddReviewProps> = ({ onReviewAdded }) => {
  const { authData } = useSelector((state: RootState) => state.AuthReducer);
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>({
    resolver: yupResolver(addReviewValidationSchema),
  });

  const onSubmit = async (data: IReview) => {
    if (!id) {
      toastMessageError("Book ID is missing!");
      return;
    }
    
    const addReviewFormData = { comment : data.comment, rating: data.rating, userId: authData?._id };
    const response = await addReview(id,addReviewFormData);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully added review");
      onReviewAdded(response.data.data.savedReview);
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };
  return (
    <>
      <div>
        <h1>Leave a Review</h1>
      </div>
      <div className="addBook-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Comment</label>
            <input
              type="text"
              {...register("comment")}
              className={`form-control ${errors.comment ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.comment?.message}</div>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number" min={1} max={5}
              {...register("rating")}
              className={`form-control ${errors.rating ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.rating?.message}</div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddReview;
