import styles from "./styles.module.scss";

type BannerProps = {
  title?: string;
  posterPath: string;
};

const baseUrl = "https://image.tmdb.org/t/p/original/";

export function Banner(props: BannerProps) {
  const { title, posterPath } = props;

  return (
    <li className={styles.banner}>
      <img
        src={`${baseUrl}${posterPath}`}
        alt={title}
      />
    </li>
  );
}
