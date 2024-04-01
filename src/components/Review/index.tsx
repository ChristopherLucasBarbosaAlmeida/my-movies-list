import { formatDate } from "../../utils/formatDate";
import styles from "./styles.module.scss";

type ReviewProps = {
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
};

export function Review(props: ReviewProps) {
  const { author_details, content, created_at } = props;

  return (
    <li className={styles.review}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/${author_details.avatar_path}`}
          alt={author_details.name}
        />
        <div>
          <strong>{author_details.username}</strong>
          <span>{formatDate(created_at)}</span>
        </div>
      </div>
      <p>{content}</p>
    </li>
  );
}
