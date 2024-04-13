import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { Button, Chip, Review } from "../../components";
import { useMovie } from "../../hooks/useMovie";
import { useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { axiosInstance } from "../../libs/axios";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { AxiosError } from "axios";

export function MovieInfo() {
  const { movieId } = useParams();

  const { movie, reviewsResponse } = useMovie(movieId);

  const { session } = useContext(SessionContext);

  async function handleAddMovieToFavorites() {
    try {
      await axiosInstance.post(`/account/${session}/favorite`, {
        media_type: "movie",
        media_id: movie?.id,
        favorite: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code);
      }
    }
  }

  return (
    <Layout>
      <main className={styles.container__info__movie}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
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
