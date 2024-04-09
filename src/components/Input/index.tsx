import { InputHTMLAttributes, forwardRef, useId } from "react";
import styles from "./styles.module.scss";

type InputProps = { label?: string; helperText?: string } & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, helperText, type = "text", ...rest } = props;

  const id = useId();

  return (
    <div className={`${styles.input} ${helperText && styles.input__error}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        {...rest}
        ref={ref}
      />
      {helperText && <span>{helperText}</span>}
    </div>
  );
});
