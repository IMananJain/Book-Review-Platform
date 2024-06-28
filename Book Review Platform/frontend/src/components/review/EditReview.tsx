import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers";
import { addReviewValidationSchema } from "../utilities/validationSchema";
import { IReview } from "../../interfaces/commonInterfaces";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import { editReview } from "../../services/review";
import routes from "../../constants/routes";

const EditReview: React.FC = () => {
  const { authData } = useSelector((state: RootState) => state.AuthReducer);
  const { bookId, id } = useParams<{ bookId:string, id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>({
    resolver: yupResolver(addReviewValidationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IReview) => {
    if (!bookId && !id) {
      toastMessageError("Book and Review ID is missing!");
      return;
    }
    
    const editReviewFormData = { comment : data.comment, rating: data.rating, bookId:bookId, userId: authData?._id };
    const response = await editReview(id!,editReviewFormData);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully updated review");
      navigate(routes.BOOK_DETAILS.replace(":id", bookId!));
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <>
      <div>
        <h1>Edit Review</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
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
              Submit
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

export default EditReview;
