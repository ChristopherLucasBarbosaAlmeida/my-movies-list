import styles from "./styles.module.scss";

type AvatarProps = {
  avatar?: string;
  username: string;
};

const baseUrl = "https://image.tmdb.org/t/p/original/";

export function Avatar(props: AvatarProps) {
  const { avatar, username } = props;

  return (
    <div className={styles.avatar}>
      {!avatar ? (
        <span>{username?.charAt(0).toUpperCase()}</span>
      ) : (
        <img
          src={`${baseUrl}${avatar}`}
          alt={username}
        />
      )}
    </div>
  );
}
