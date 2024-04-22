import styles from "./styles.module.scss";

type BannerProps = {
  title?: string;
  posterPath: string;
};

export function Banner({ posterPath, title }: BannerProps) {
  return (
    <li className={styles.banner}>
      <img
        src={`${import.meta.env.VITE_BASE_URL_IMAGE}${posterPath}`}
        alt={title}
      />
    </li>
  );
}
