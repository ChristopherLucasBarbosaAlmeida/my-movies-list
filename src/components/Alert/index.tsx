import styles from "./styles.module.scss";

type AlertProps = {
  title: string;
  description: string;
};

export function Alert({ title, description }: AlertProps) {
  return (
    <div className={styles.alert}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
