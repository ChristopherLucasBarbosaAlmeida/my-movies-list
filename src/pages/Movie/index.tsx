import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { Chip, Review } from "../../components";
import { useMovie } from "../../hooks/useMovie";
import { useParams } from "react-router-dom";

export function MovieInfo() {
  const { movieId } = useParams();

  const { movie, reviewsResponse } = useMovie(movieId);

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
