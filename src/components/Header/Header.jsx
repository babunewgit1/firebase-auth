import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { user, logOut } = useContext(UserContext);
  console.log(user);
  const handelLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successfull!!!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="navbar bg-green-500 text-white">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>{!user && <Link to="/login">Login</Link>}</li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>{user && <Link to="/confident">Confident</Link>}</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <span>
              {user?.email && (
                <>
                  {user.email}
                  <button onClick={handelLogOut} className="text-primary">
                    Logout
                  </button>
                </>
              )}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default Header;
