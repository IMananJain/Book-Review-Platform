import React from "react";
import routes from "../../../constants/routes";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  console.log("Home");
  return (
    <div>
      <div><h1>Find Your Favorite Books</h1></div>
        <div>
          <p>Welcome!</p>
          <Link to={routes.BOOK_LIST}>Go to Book List</Link>
        </div>
    </div>
      
  );
};
export default Home;
