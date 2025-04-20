import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGY5ZGIzOWRjMzJiOTE1ZWU1NDE5ODMwOTRmMmRiNyIsIm5iZiI6MTc0NDk2NzU0MS4wMzMsInN1YiI6IjY4MDIxNzc1ZDMxN2JlNWU1Yzk5MjQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hP8qrS3giAN-TUTj8_u5hL9UEAX4n1ZnmCLWg9oOD-I";

const getMovies = async (endpoint, params = {}) => {
  const url = `https://api.themoviedb.org/3${endpoint}`;

  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: { language: "en-US", ...params },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTrandMovies = (page) => {
  return getMovies("/trending/movie/day", { page });
};

export const getMoviesByQuery = (query, page = 1) => {
  return getMovies("/search/movie", { query, page });
};

export const getMovieDetails = (movieId) => {
  return getMovies(`/movie/${movieId}`);
};

export const getMovieCast = (movieId) => {
  return getMovies(`/movie/${movieId}/credits`);
};

export const getMovieReviews = (movieId) => {
  return getMovies(`/movie/${movieId}/reviews`);
};
