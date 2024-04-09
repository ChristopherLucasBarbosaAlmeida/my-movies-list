import { ButtonHTMLAttributes, ElementType } from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
  variant: keyof typeof variants;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: styles.button__primary,
  seconday: styles.button__secondary,
  purple: styles.button__purple,
};

export function Button(props: ButtonProps) {
  const { children, variant, leftIcon: LeftIcon, rightIcon: RightIcon, ...rest } = props;

  return (
    <button
      className={`${styles.button} ${variants[variant]}`}
      {...rest}
    >
      {LeftIcon && <LeftIcon />}
      {children}
      {RightIcon && <RightIcon />}
    </button>
  );
}
