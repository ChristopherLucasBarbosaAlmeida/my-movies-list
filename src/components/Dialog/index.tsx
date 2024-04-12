import styles from "./styles.module.scss";
import { DialogHTMLAttributes, forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";

type DialogProps = {
  title: string;
  textContent?: string;
  handleClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ title, textContent, children, handleClose, ...rest }, ref) => {
    return (
      <dialog
        className={styles.dialog}
        ref={ref}
        {...rest}
      >
        <div>
          <h1>{title}</h1>
          <RxCross2
            size={20}
            onClick={handleClose}
          />
        </div>
        {textContent && <p>{textContent}</p>}
        {children}
      </dialog>
    );
  }
);
