import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import routes from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state_management/reducers";
import { bindActionCreators } from "redux";
import { logOutAction } from "../../../state_management/actions/authAction";
import storage from "../../../util/storage";


const Header: React.FC = () => {
  const userData = useSelector((state: RootState) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const actions = bindActionCreators(
    {
      logOutAction,
    },
    dispatch
  );
  const handleLogout = () => {
    storage.clear();
    actions.logOutAction();
    navigate(routes.LOGIN);
  };
  return (
    <nav>
      <div className=" header-center dynamic-content">
      <Link to={routes.HOME}>Home</Link>
        {userData && userData.isLoggedIn ? (
          <> 
            <div>
              <Link to={routes.BOOK_LIST}>BookList</Link>
            </div>
            <div>
              <Link to={routes.ADD_BOOK}>AddBook</Link>
            </div>
            <Link to={routes.PROFILE}>My Profile</Link>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <div>
              <button>
                <Link to={routes.SIGN_UP}>Sign Up</Link>
              </button>
            </div>
            <div>
            <button>
              <Link to={routes.LOGIN}>LogIn</Link>
            </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
export default Header;
