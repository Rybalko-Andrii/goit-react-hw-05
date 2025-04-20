import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = React.lazy(() => import("./pages/MoviePage/MoviePage"));
const MovieDetailsPage = React.lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const MovieCast = React.lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = React.lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const Navigation = React.lazy(() =>
  import("./components/Navigation/Navigation")
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
