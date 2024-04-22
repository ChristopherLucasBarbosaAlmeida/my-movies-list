import styles from "./styles.module.scss";

type AvatarProps = {
  avatarPath?: string;
  username?: string;
};

export function Avatar({ avatarPath, username }: AvatarProps) {
  const firstLetterName = username?.charAt(0).toUpperCase();

  return (
    <div className={styles.avatar}>
      {!avatarPath ? (
        <span>{firstLetterName}</span>
      ) : (
        <img
          src={`${import.meta.env.VITE_BASE_URL_IMAGE}${avatarPath}`}
          alt={username}
        />
      )}
    </div>
  );
}
