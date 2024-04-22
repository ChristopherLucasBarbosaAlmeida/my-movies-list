import { useContext, useEffect, useState } from "react";
import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { SessionIdContext } from "../../context/SessionIdContext";
import { Banner } from "../../components";
import { PagedMovie, PaginatedData } from "../../types/PaginatedData";
import { movieService } from "../../services/MovieService";

export function Favorites() {
  const [paginatedFavorites, setPaginatedFavorites] = useState<PaginatedData<PagedMovie>>();

  const { sessionId } = useContext(SessionIdContext);

  useEffect(() => {
    (async () => {
      const paginatedFavoritesData = await movieService.getFavorites(sessionId);
      setPaginatedFavorites(paginatedFavoritesData);
    })();
  }, []);

  return (
    <Layout>
      <div className={styles.container__favorites}>
        <header>
          <h1>Seus favoritos</h1>
        </header>
        <ul>
          {paginatedFavorites?.results.map((result) => (
            <Banner
              key={result.id}
              posterPath={result.poster_path}
              title={result.title}
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
}
