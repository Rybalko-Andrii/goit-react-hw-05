import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/Api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          <div>
            {/* Додаємо зображення актора */}
            {actor.profile_path && (
              <img
                src={`${imageBaseUrl}${actor.profile_path}`}
                alt={actor.name}
                width="100"
                height="150"
              />
            )}
            <p>
              {actor.name} as {actor.character}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
