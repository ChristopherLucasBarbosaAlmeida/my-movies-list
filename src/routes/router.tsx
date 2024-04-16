import { createBrowserRouter } from "react-router-dom";
import { Favorites, Home, Login, MediaDetails } from "../pages";
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
    path: "/media-details/:mediaType/:mediaId",
    element: (
      <PrivateRoute>
        <MediaDetails />,
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
