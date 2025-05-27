import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMoviesByQuery } from "../../services/Api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      setSearchParams({ query: searchValue });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <form className="flex max-w-[400px] w-full" onSubmit={handleSubmit}>
        <input
          className="flex-grow bg-amber-100/50 pt-4 pb-4 pl-4 pr-4 rounded-l-md mb-4"
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button
          className="bg-blue-900/50 text-amber-100/50 pt-4 pb-4 pl-6 pr-6 rounded-r-md cursor-pointer mb-4"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
