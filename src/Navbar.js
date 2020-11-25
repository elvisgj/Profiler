import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "./actions";
import { Link } from "react-router-dom";

function NavBar() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const userLinks = (
    <div className="font-serif m-4 text-sm md:text-lg">
      <Link className="p-1 text-white" to="/home">
        Home
      </Link>
      <Link className="p-1 text-white" to="/users">
        Users
      </Link>
      <button
        onClick={() => {
          dispatch(loggedOut());
        }}
        className="p-1 text-white"
      >
        Logout
      </button>
    </div>
  );

  const guestLinks = (
    <div className="font-serif m-4 text-sm md:text-lg">
      <Link className="p-1 text-white" to="/">
        Sign in
      </Link>
      <Link className="p-1 text-white" to="/login">
        Login
      </Link>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-green-300 to-blue-400 flex justify-between">
      <h3 className="font-bold text-white font-serif m-4 text-sm md:text-3xl self-center">
        Profiler
      </h3>
      {isAuth ? userLinks : guestLinks}
    </nav>
  );
}

export default NavBar;
