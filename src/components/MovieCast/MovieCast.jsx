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

  const placeholderImg = "/src/img/No_Image_Available.jpg";

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {cast.map((actor) => (
        <li key={actor.id}>
          <div className="flex flex-col items-center text-white">
            <img
              src={
                actor.profile_path
                  ? `${imageBaseUrl}${actor.profile_path}`
                  : placeholderImg
              }
              alt={actor.name}
              width="150"
              height="225"
              className="w-[150px] h-[225px] object-cover rounded shadow-md"
            />
            <p className="mt-2 text-center text-sm">
              {actor.name} as {actor.character}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
