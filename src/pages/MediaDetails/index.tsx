import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { Banner, Button, Chip, Review } from "../../components";
import { useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { axiosInstance } from "../../libs/axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { AxiosError } from "axios";
import { Movie, TV } from "../../types/Movie";
import { ReviewsResponse } from "../../types/ReviewsResponse";

export function MediaDetails() {
  const [mediaDataResponse, setMediaDataResponse] = useState<Movie & TV>();
  const [reviewDataResponse, setReviewsDataResponse] = useState<ReviewsResponse>();

  const { mediaId, mediaType } = useParams();

  const { session } = useContext(SessionContext);

  async function handleAddMovieToFavorites() {
    try {
      await axiosInstance.post(`/account/${session}/favorite`, {
        media_type: "movie",
        media_id: mediaId,
        favorite: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`${mediaType}/${mediaId}`);
      setMediaDataResponse(response.data);
    })();
  }, [mediaId]);

  const mediaName = mediaDataResponse?.title ?? mediaDataResponse?.name;

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`movie/${mediaId}/reviews`);
      setReviewsDataResponse(response.data);
    })();
  }, [mediaId]);

  return (
    <Layout>
      <div className={styles.container__info__movie}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${mediaDataResponse?.poster_path}`}
            alt={mediaName}
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
          <h1>{mediaName}</h1>
          <div>
            {mediaDataResponse?.genres.map((genre) => (
              <Chip
                key={genre.id}
                name={genre.name}
              />
            ))}
          </div>
          <p>{mediaDataResponse?.overview}</p>
          {mediaDataResponse?.seasons && (
            <section>
              <h2>Temporadas</h2>
              <ul>
                {mediaDataResponse?.seasons?.map((result) => (
                  <Banner
                    key={result.id}
                    title={mediaName}
                    posterPath={result.poster_path}
                  />
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>Reviews</h2>
            <ul>
              {reviewDataResponse?.results.map((result) => (
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
