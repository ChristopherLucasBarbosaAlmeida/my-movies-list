import { createBrowserRouter } from "react-router-dom";
import { Home, Login, MovieInfo } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    index: true,
    element: (
      <PrivateRoute>
        <Home />,
      </PrivateRoute>
    ),
  },
  {
    path: "/movie/:movieId",
    element: (
      <PrivateRoute>
        <MovieInfo />,
      </PrivateRoute>
    ),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
