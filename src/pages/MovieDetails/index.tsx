import { useContext, useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { movieService } from "../../services/MovieService";
import { useParams } from "react-router-dom";
import { Layout } from "../../layout";
import styles from "./styeles.module.scss";
import { Button, Chip, Review } from "../../components";
import { CiBookmark } from "react-icons/ci";
import { PagedReview, PaginatedData } from "../../types/PaginatedData";
import { SessionIdContext } from "../../context/SessionIdContext";
import { AxiosError } from "axios";

export function MovieDetails() {
  const [movie, setMovie] = useState<Movie>();
  const [paginatedReviews, setPaginatedReviews] = useState<PaginatedData<PagedReview>>();

  const { movieId } = useParams();

  const { sessionId } = useContext(SessionIdContext);

  useEffect(() => {
    (async () => {
      if (!movieId) return;

      const movieData = await movieService.getMedia(movieId);
      setMovie(movieData);

      const paginatedReviewsData = await movieService.getReviews(movieId);
      setPaginatedReviews(paginatedReviewsData);
    })();
  }, [movieId]);

  async function handleAddMovieToFavorites() {
    try {
      await movieService.addToFavorite(sessionId, movieId!);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code);
      }
    }
  }

  return (
    <Layout>
      <div className={styles.container__movie__details}>
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${movie?.poster_path}`}
            alt={movie?.title}
          />
          <Button
            variant="primary"
            rightIcon={() => <CiBookmark size={20} />}
            onClick={handleAddMovieToFavorites}
          >
            Adicionar aos favoritos
          </Button>
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
              {paginatedReviews?.results.map((result) => (
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
      </div>
    </Layout>
  );
}
