import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    if (
      token &&
      (location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/reset-password")
    ) {
      navigate("/home", { replace: true });
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
