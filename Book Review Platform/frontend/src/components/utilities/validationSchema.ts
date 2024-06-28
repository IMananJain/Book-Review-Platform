import * as Yup from "yup";
import {
  GENRE,
  MAX_IMAGE_SIZE,
  PASSWORD_REGEX,
  SUPPORTED_IMAGE_FORMATS,
} from "../../util/commonConstants";

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(30, "Full Name must not exceed 30 characters"),

  email: Yup.string().required("Email is required").email("Email is invalid"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(40, "Password must not exceed 40 characters"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Confirm Password does not match"),

  image: Yup.mixed<FileList>()
    .required("Image is required")
    .test("filePresence", "No file chosen", (value) => {
      return value && value.length > 0;
    })
    .test("fileFormat", "Unsupported file format", function (value) {
      if (!value || !value.length) return false;
      const file = value[0];
      if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
        return false;
      }
      return true;
    })
    .test("fileSize", "File size is too large", function (value) {
      if (!value || !value.length) return false;
      const file = value[0];
      if (file.size > MAX_IMAGE_SIZE) {
        return false;
      }
      return true;
    }),
});

export const logInValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(40, "Password must not exceed 40 characters"),
});

export const addBookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 6 characters")
    .max(30, "Title must not exceed 30 characters"),

  image: Yup.mixed<FileList>()
    .required("Image is required")
    .test("filePresence", "No file chosen", (value) => {
      return value && value.length > 0;
    })
    .test("fileFormat", "Unsupported file format", function (value) {
      if (!value || !value.length) return false;
      const file = value[0];
      if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
        return false;
      }
      return true;
    })
    .test("fileSize", "File size is too large", function (value) {
      if (!value || !value.length) return false;
      const file = value[0];
      if (file.size > MAX_IMAGE_SIZE) {
        return false;
      }
      return true;
    }),

  author: Yup.string()
    .required("Author is required")
    .min(2, "Author must be at least 2 characters")
    .max(30, "Author must not exceed 30 characters"),

  description: Yup.string()
    .required("Author is required")
    .min(10, "Author must be at least 10 characters")
    .max(200, "Author must not exceed 200 characters"),

  genre: Yup.string()
    .required("Genre is required")
    .oneOf(
      GENRE,
      "Genre must be one of the 'Fiction', 'Non-Fiction', 'Drama', 'Poetry'"
    ),
});

export const editProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),

  image: Yup.mixed<FileList>()
    .required("Image is required")
    .test("filePresence", "No file chosen", (value) => {
      return value && value.length > 0;
    })
    .test("fileFormat", "Unsupported file format", function (value) {
      if (!value || value.length === 0) return false;
      const file = value[0];
      return SUPPORTED_IMAGE_FORMATS.includes(file.type);
    })
    .test("fileSize", "File size is too large", function (value) {
      if (!value || value.length === 0) return false;
      const file = value[0];
      return file.size <= MAX_IMAGE_SIZE;
    }),
});

export const addReviewValidationSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5)
});
