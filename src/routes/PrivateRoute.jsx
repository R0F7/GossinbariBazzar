import Spinier from "@/components/Spinier/Spinier";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  //   console.log(location);

  if (loading) return <Spinier></Spinier>;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
