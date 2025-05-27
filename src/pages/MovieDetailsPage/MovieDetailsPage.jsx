import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../services/Api";
import Loader from "../../components/Loader/Loader";
import GoBackButton from "../../components/GoBackBtn/GoBackBtn";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state.from ?? "/movies");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div>
      <GoBackButton fallback={backLinkRef.current} />

      {loading && <Loader />}

      <div className="flex gap-4   items-center justify-center">
        <img
          src={poster}
          alt={movie.title}
          width={320}
          className="rounded-lg"
        />
        <div className="max-w-[700px]">
          <h2 className="text-2xl mb-4 text-amber-100 ">{movie.title}</h2>
          <p className="text-md mb-4 text-amber-100">
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3 className="text-lg mb-4 text-amber-100">Overview</h3>
          <p className="text-md mb-4 text-amber-100">{movie.overview}</p>
          <h3 className="text-lg mb-4 text-amber-100">Genres</h3>
          <p className="text-md mb-4 text-amber-100">
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      <div className=" flex flex-col   items-center justify-center mt-4">
        <h3 className="text-2xl text-amber-100">Additional information</h3>
        <ul className="flex gap-4">
          <li className="pt-2 pb-2 pl-2 pr-2 text-lg text-amber-100 hover:text-amber-300">
            <Link to="cast" state={{ from: location.state?.from }}>
              Cast
            </Link>
          </li>
          <li className="pt-2 pb-2 pl-2 pr-2 text-lg text-amber-100 hover:text-amber-300">
            <Link to="reviews" state={{ from: location.state?.from }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
