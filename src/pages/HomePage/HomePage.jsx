import { useEffect, useState } from "react";
import { getTrandMovies } from "../../services/Api";
import MovieList from "../../components/MovieList/MovieList";
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
    <div>
      <h1>Trending today</h1>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
