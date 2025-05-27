import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  const placeholderImg = "/src/img/No_Image_Available.jpg";
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className="flex flex-col items-center text-white hover:text-cyan-400 hover:scale-105 transition duration-200"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : placeholderImg
              }
              alt={movie.title}
              className="w-[150px] h-[225px] object-cover rounded shadow-md"
            />
            <span className="mt-2 text-center text-sm">{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
