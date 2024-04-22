import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { Banner, Button, Chip, Review } from "../../components";
import { useParams } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { SessionIdContext } from "../../context/SessionIdContext";
import { AxiosError } from "axios";
import { PagedReview, PaginatedData } from "../../types/PaginatedData";
import { TvProgram } from "../../types/TvProgram";
import { tvProgramService } from "../../services/TvProgramService";

export function TvProgramDetails() {
  const [tvProgram, setTvProgram] = useState<TvProgram>();
  const [paginatedReviews, setPaginatedReviews] = useState<PaginatedData<PagedReview>>();

  const { sessionId } = useContext(SessionIdContext);
  const { tvProgramId } = useParams();

  useEffect(() => {
    (async () => {
      if (!tvProgramId) return;

      const tvProgramData = await tvProgramService.getMedia(tvProgramId);
      setTvProgram(tvProgramData);

      const paginatedReviewsData = await tvProgramService.getReviews(tvProgramId);
      setPaginatedReviews(paginatedReviewsData);
    })();
  }, [tvProgramId]);

  async function handleAddTvProgramFavorites() {
    try {
      await tvProgramService.addToFavorite(sessionId, tvProgramId!);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code);
      }
    }
  }

  return (
    <Layout>
      <div className={styles.container__tv__program__details}>
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${tvProgram?.poster_path}`}
            alt={tvProgram?.name}
          />
          <Button
            variant="primary"
            rightIcon={() => <CiBookmark size={20} />}
            onClick={handleAddTvProgramFavorites}
          >
            Adicionar aos favoritos
          </Button>
        </div>
        <section>
          <h1>{tvProgram?.name}</h1>
          <div>
            {tvProgram?.genres.map((genre) => (
              <Chip
                key={genre.id}
                name={genre.name}
              />
            ))}
          </div>
          <p>{tvProgram?.overview}</p>
          <section>
            <h2>Temporadas</h2>
            <ul>
              {tvProgram?.seasons?.map((result) => (
                <Banner
                  title={tvProgram?.name}
                  posterPath={result.poster_path}
                />
              ))}
            </ul>
          </section>
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
