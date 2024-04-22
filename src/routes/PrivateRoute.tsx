import { ReactNode, useContext, useEffect } from "react";
import { SessionIdContext } from "../context/SessionIdContext";
import { useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { sessionId } = useContext(SessionIdContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/login");
    }
  }, [sessionId, navigate]);

  return children;
}
