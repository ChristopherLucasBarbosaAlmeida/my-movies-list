import styles from "./styles.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";

type ListProps = {
  name: string;
  handleClick: () => void;
};

export function List({ name, handleClick }: ListProps) {
  return (
    <li className={styles.list}>
      <span>{name}</span>
      <div>
        <FaRegTrashAlt
          size={20}
          onClick={handleClick}
        />
      </div>
    </li>
  );
}
