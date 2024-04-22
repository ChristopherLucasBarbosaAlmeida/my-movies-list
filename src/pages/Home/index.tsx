import { Banner, Select } from "../../components";
import styles from "./styles.module.scss";
import { Layout } from "../../layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Genre } from "../../types/Genre";
import { PagedMovie, PagedTvProgram, PaginatedData } from "../../types/PaginatedData";
import { movieService } from "../../services/MovieService";
import { tvProgramService } from "../../services/TvProgramService";

const sortingFilters = [
  {
    label: "Popularide",
    value: "popularity.asc",
  },
  {
    label: "Mais votados",
    value: "vote_average.asc",
  },
  {
    label: "Menos votados",
    value: "vote_average.desc",
  },
];

export function Home() {
  const [paginatedMovies, setPaginatedMovies] = useState<PaginatedData<PagedMovie>>();
  const [paginatedTvPrograms, setPaginatedTvPrograms] = useState<PaginatedData<PagedTvProgram>>();

  const [genreFilter, setGenreFilter] = useState("");
  const [sortBy, setSortBy] = useState("vote_avarage.desc");

  const [genres, setGenres] = useState<Genre>();
  const genderSelectionOptions = genres?.genres.map((genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  useEffect(() => {
    (async () => {
      const paginatedMoviesData = await movieService.getMedias({
        sortBy,
        withGenres: genreFilter,
      });

      setPaginatedMovies(paginatedMoviesData);
    })();
  }, [genreFilter, sortBy]);

  useEffect(() => {
    (async () => {
      const paginatedTvProgramsData = await tvProgramService.getMedias();
      setPaginatedTvPrograms(paginatedTvProgramsData);

      const genresData = await movieService.getGenres();
      setGenres(genresData);
    })();
  }, []);

  return (
    <Layout>
      <div className={styles.container__home}>
        <header>
          <h1>Filmes</h1>
          <div>
            <Select
              options={genderSelectionOptions}
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              onChange={(genderSelectionOptions) =>
                setGenreFilter(genderSelectionOptions.map((option) => option.value).join(","))
              }
            />
            <Select
              options={sortingFilters}
              closeMenuOnSelect={false}
              onChange={(sortingOption) => setSortBy(sortingOption!.value)}
            />
          </div>
        </header>
        <ul>
          {paginatedMovies?.results?.map((result) => (
            <Link
              to={`/movie/${result.id}`}
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
          {paginatedTvPrograms?.results.map((result) => (
            <Link
              to={`/tv/${result.id}`}
              key={result.id}
            >
              <Banner
                posterPath={result.poster_path}
                title={result.name}
              />
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
