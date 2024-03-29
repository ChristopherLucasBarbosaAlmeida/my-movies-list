import { createBrowserRouter } from "react-router-dom";
import { Home, MovieInfo } from "../pages";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/movie/:movieId",
    element: <MovieInfo />,
    loader: ({ params }) => {
      return params;
    },
  },
]);
