import { formatDate } from "../../utils/formatDate";
import { Avatar } from "..";
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
        <Avatar
          username={author_details.username}
          avatar={author_details.avatar_path}
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
