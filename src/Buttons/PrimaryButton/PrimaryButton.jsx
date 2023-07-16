import Button from "../Button/Button";
import { ThemeContext } from "../../App";
import styles from "./PrimaryButton.module.css";
import { useContext } from "react";

export default function PrimaryButton({ children, className, action }) {
  const theme = useContext(ThemeContext);

  let btnClass = styles.btn_primary;

  switch (theme) {
    case 1:
      btnClass += ` ${styles.btn_primary_th1}`;
      break;
    case 2:
      btnClass += ` ${styles.btn_primary_th2}`;
      break;
    case 3:
      btnClass += ` ${styles.btn_primary_th3}`;
      break;
  }

  return (
    <Button className={`${btnClass} ${className}`} action={action}>
      {children}
    </Button>
  );
}
