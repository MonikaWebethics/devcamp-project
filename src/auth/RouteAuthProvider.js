import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "Utility/token";

const RouteAuthProvider = ({ isProtected, children }) => {
  const token = getToken();

  if (isProtected && !token) {
    return <Navigate to="/login" />;
  } else if (!isProtected && token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default RouteAuthProvider;
