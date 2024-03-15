import styles from "./styles.module.scss";

type BannerProps = {
  bannerUrl: string;
  name: string;
  genre: string;
};

export function Banner(props: BannerProps) {
  const { bannerUrl, genre, name } = props;

  return (
    <li className={styles.banner}>
      <img
        src={bannerUrl}
        alt={name}
      />
      <strong>{name}</strong>
      <span>{genre}</span>
    </li>
  );
}
