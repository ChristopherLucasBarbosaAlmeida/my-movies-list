import styles from "./styles.module.scss";

type ListProps = {
  imgUlr: string;
  name: string;
};

export function List(props: ListProps) {
  const { name } = props;

  return (
    <li className={styles.list}>
      <div></div>
      <span>{name}</span>
    </li>
  );
}
