import React, { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading</div>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace={true}></Navigate>;
};

export default PrivetRouter;
