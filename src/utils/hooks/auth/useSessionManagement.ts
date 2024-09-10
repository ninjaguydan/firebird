import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function useSesionManagement(isLoggedIn: boolean) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [isLoggedIn]);
}
