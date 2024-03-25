import { Banner, Select } from "../../components";
import styles from "./styles.module.scss";
import { Layout } from "../../layout";
import { useState } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useMovie } from "../../hooks/useMovie";

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

export function Home() {
  const [genre, setGenre] = useState("");
  const [popularity, setPopularity] = useState("vote_avarage.asc");

  const genres = useGenres();
  const options = genres.map((genre) => ({ label: genre.name, value: genre.id }));

  const { response } = useMovie(genre, popularity);

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
