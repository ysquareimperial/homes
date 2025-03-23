import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import AppNavigation from "./Routes/AppNavigation";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/register") {
      return;
    }

    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <AppNavigation />
    </div>
  );
}

export default App;
