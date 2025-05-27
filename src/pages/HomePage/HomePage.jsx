import { useEffect, useState } from "react";
import { getTrandMovies } from "../../services/Api";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const data = await getTrandMovies();
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="pl-4 pr-4 pt-8 pb-8 ">
      <h1 className="text-center text-2xl text-cyan-200 mb-4">
        Trending today
      </h1>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
