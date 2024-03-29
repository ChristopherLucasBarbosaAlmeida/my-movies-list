import styles from "./styles.module.scss";

type ChipProps = {
  name: string;
};

export function Chip({ name }: ChipProps) {
  return <div className={styles.chip}>{name}</div>;
}
