import { Banner, Select } from "../../components";
import styles from "./styles.module.scss";
import { Layout } from "../../layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../libs/axios";
import { MoviesResponse } from "../../types/MovieResponse";
import { GenreResponse } from "../../types/Genre";
import { AxiosResponse } from "axios";

const order = [
  {
    label: "Popularide",
    value: "popularity.asc",
  },
  {
    label: "Mais votados",
    value: "vote_avarage.asc",
  },
  {
    label: "Menos votados",
    value: "vote_avarage.desc",
  },
];

const mediaTypes = {
  tv: "tv",
  movie: "movie",
};

export function Home() {
  const [genre, setGenre] = useState("");
  const [response, setResponse] = useState<MoviesResponse>();
  const [popularity, setPopularity] = useState("vote_avarage.asc");
  const [responseDataSeries, setResponseDataSeries] = useState<MoviesResponse>();
  const [genresDataResponse, setGenresDataResponse] = useState<GenreResponse>();

  const options =  genresDataResponse?.genres.map((genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get("/tv/popular");
      setResponseDataSeries(result.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<GenreResponse> = await axiosInstance.get("genre/movie/list");
      setGenresDataResponse(response.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("discover/movie", {
        params: {
          with_genres: genre,
          sort_by: popularity,
        },
      });
      setResponse(response.data);
    })();
  }, [genre, popularity]);

  return (
    <Layout>
      <div className={styles.container__home}>
        <header>
          <h1>Your recents movies</h1>
          <div>
            <Select
              options={options}
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              onChange={(options) => setGenre(options.map((option) => option.value).join(","))}
            />
            <Select
              options={order}
              closeMenuOnSelect={false}
              onChange={(option) => setPopularity(option!.value)}
            />
          </div>
        </header>
        <ul>
          {response?.results.map((result) => (
            <Link
              to={`media-details/${mediaTypes.movie}/${result.id}`}
              key={result.id}
            >
              <Banner
                posterPath={result.poster_path}
                title={result.title}
              />
            </Link>
          ))}
        </ul>
        <h1>Series e programas de TV</h1>
        <ul>
          {responseDataSeries?.results.map((result) => (
            <Link
              to={`media-details/${mediaTypes.tv}/${result.id}`}
              key={result.id}
            >
              <Banner
                posterPath={result.poster_path}
                title={result.title}
              />
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
