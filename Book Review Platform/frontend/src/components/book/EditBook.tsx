import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import "./EditBook.css";
import { IBookFormValues } from "../../interfaces/commonInterfaces";
import { addBookValidationSchema } from "../utilities/validationSchema";
import { fileToBase64 } from "../auth/SignUp";
import { editBook } from "../../services/book";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonToastMessage";
import routes from "../../constants/routes";
import { GENRE } from "../../util/commonConstants";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookFormValues>({
    resolver: yupResolver(addBookValidationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IBookFormValues) => {
    const base64StringImage = await fileToBase64(data.image[0]);

    const editBookFormData = {
      title: data.title,
      image: base64StringImage,
      author: data.author,
      description: data.description,
      genre: data.genre,
    };
    
    const response = await editBook(id as string, editBookFormData);

    if (response && response.data && response.data.success) {
      toastMessageSuccess("Successfully updated book");
      navigate(routes.BOOK_DETAILS.replace(":id", id as string));
    }
    if (response && response.error && !response.error.success) {
      toastMessageError(`Error ${response.error.message}`);
    }
  };

  return (
    <>
      <div>
        <h1>Edit Book</h1>
      </div>
      <div className="edit-book-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              {...register("title")}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.image?.message}</div>
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              {...register("author")}
              className={`form-control ${errors.author ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.author?.message}</div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              {...register("description")}
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.description?.message}
            </div>
          </div>

          <div className="form-group">
            <label>Genre</label>
            <select
              id="genre"
              {...register("genre", {
                required: "Genre is required",
              })}
              className={`form-control ${errors.genre ? "is-invalid" : ""}`}
            >
              {GENRE.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.genre?.message}</div>
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

export default EditBook;
