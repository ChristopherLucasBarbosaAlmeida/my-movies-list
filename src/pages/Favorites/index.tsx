import { useContext, useEffect, useState } from "react";
import { Layout } from "../../layout";
import styles from "./styles.module.scss";
import { axiosInstance } from "../../libs/axios";
import { SessionContext } from "../../context/SessionContext";
import { AxiosResponse } from "axios";
import { MoviesResponse } from "../../types/MovieResponse";
import { Banner } from "../../components";

export function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState<MoviesResponse>();

  const { session } = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<MoviesResponse> = await axiosInstance.get(
        `/account/${session}/favorite/movies`
      );
      setFavoriteMovies(response.data);
    })();
  }, []);

  return (
    <Layout>
      <div className={styles.container__favorites}>
        <header>
          <h1>Seus favoritos</h1>
        </header>
        <ul>
          {favoriteMovies?.results.map((result) => (
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
