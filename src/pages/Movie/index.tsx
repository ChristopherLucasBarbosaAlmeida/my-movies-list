import { Layout } from "../../layout";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { axiosInstance } from "../../libs/axios";
import { Chip, Review } from "../../components";

type ReviewsResponse = {
  id: number;
  page: number;
  results: {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string;
      rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }[];
  total_page: number;
  total_results: number;
};

export function MovieInfo() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse | null>(null);

  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`movie/${movieId}`);
      setMovie(response.data);
    })();
  }, [movieId]);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`movie/${movieId}/reviews`);
      setReviewsResponse(response.data);
    })();
  }, [movieId]);

  return (
    <Layout>
      <main className={styles.container__info__movie}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
          />
        </div>
        <section>
          <h1>{movie?.title}</h1>
          <div>
            {movie?.genres.map((genre) => (
              <Chip
                key={genre.id}
                name={genre.name}
              />
            ))}
          </div>
          <p>{movie?.overview}</p>
          <section>
            <h2>Reviews</h2>
            <ul>
              {reviewsResponse?.results.map((result) => (
                <Review
                  key={result.id}
                  author_details={result.author_details}
                  content={result.content}
                  created_at={result.created_at}
                />
              ))}
            </ul>
          </section>
        </section>
      </main>
    </Layout>
  );
}
