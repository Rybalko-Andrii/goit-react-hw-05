import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/Api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center  min-h-screen p-4">
      {loading ? (
        <Loader />
      ) : reviews.length > 0 ? (
        <ul className="w-full max-w-3xl space-y-6">
          {reviews.map((review) => (
            <li key={review.id} className="p-4">
              <h4 className="mb-2 font-semibold text-lg text-amber-100 ">
                Author: {review.author}
              </h4>
              <p className="text-amber-100 whitespace-pre-line">
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-amber-100 text-xl">No reviews found.</p>
      )}
    </div>
  );
};

export default MovieReviews;
