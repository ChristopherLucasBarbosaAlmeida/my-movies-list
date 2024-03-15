import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

type ButtonProps = { children: ReactNode; variant: keyof typeof variants } & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: styles.button__primary,
  seconday: styles.button__secondary,
  purple: styles.button__purple,
};

export function Button(props: ButtonProps) {
  const { children, variant } = props;

  return (
    <button
      className={`${styles.button} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
