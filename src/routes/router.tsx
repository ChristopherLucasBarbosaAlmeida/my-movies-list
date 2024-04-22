import { createBrowserRouter } from "react-router-dom";
import { Favorites, Home, Login, TvProgramDetails } from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { MovieDetails } from "../pages/MovieDetails";

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
        <MovieDetails />,
      </PrivateRoute>
    ),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/tv/:tvProgramId",
    element: (
      <PrivateRoute>
        <TvProgramDetails />,
      </PrivateRoute>
    ),
    loader: ({ params }) => {
      return params;
    },
  },
  {
    path: "/favorites",
    element: (
      <PrivateRoute>
        <Favorites />,
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
