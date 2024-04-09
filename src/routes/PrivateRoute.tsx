import { ReactNode, useContext, useEffect } from "react";
import { SessionContext } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;

  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  return children;
}
