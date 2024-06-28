import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "./constants/routes";
import PrivateRoutes from "./PrivateRoutes";

import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import Header from "./components/utilities/header/Header";
import Home from "./components/utilities/home/Home";
import SignUp from "./components/auth/SignUp";
import EditProfile from "./components/user/EditProfile";
import BookList from "./components/book/BookList";
import AddBook from "./components/book/AddBook";
import BookDetails from "./components/book/BookDetails";
import EditBook from "./components/book/EditBook";
import EditReview from "./components/review/EditReview";

interface Props{
    component: React.ComponentType;
    route: string;
}

export const WithHeader: React.FC<Props> = (props) =>{
    return (
        <>
        <div className="main-container">
            <Header />
            <div className="common-box">
              <PrivateRoutes {...props} />
            </div>
          </div>
      </>
    )
}

const PublicRoutes: React.FC = () =>{
    return(
        <Routes>
            <Route path={routes.HOME} element={<WithHeader component={Home} route={routes.HOME} /> } />
            <Route path={routes.SIGN_UP} element={<PrivateRoutes component={SignUp} route={routes.SIGN_UP} /> } />
            <Route path={routes.LOGIN} element={<PrivateRoutes component={Login} route={routes.LOGIN} /> } />
            <Route path={routes.PROFILE} element={<WithHeader component={Profile} route={routes.PROFILE} /> } />
            <Route path={routes.EDIT_PROFILE} element={<WithHeader component={EditProfile} route={routes.EDIT_PROFILE} /> } />
            <Route path={routes.BOOK_LIST} element={<WithHeader component={BookList} route={routes.BOOK_LIST} /> } />
            <Route path={routes.ADD_BOOK} element={<WithHeader component={AddBook} route={routes.ADD_BOOK} /> } />
            <Route path={routes.BOOK_DETAILS} element={<WithHeader component={BookDetails} route={routes.BOOK_DETAILS} /> } />
            <Route path={routes.EDIT_BOOK} element={<WithHeader component={EditBook} route={routes.EDIT_BOOK} /> } />
            <Route path={routes.EDIT_REVIEW} element={<WithHeader component={EditReview} route={routes.EDIT_REVIEW} /> } />
        </Routes>
    );
}

export default PublicRoutes;