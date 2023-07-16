import Button from "../Button/Button";
import { ThemeContext } from "../../App";
import styles from "./NormalButton.module.css";
import { useContext } from "react";

export default function NormalButton({ children, className, action }) {
  const theme = useContext(ThemeContext);

  let btnClass = styles.btn_normal;

  switch (theme) {
    case 1:
      btnClass += ` ${styles.btn_normal_th1}`;
      break;
    case 2:
      btnClass += ` ${styles.btn_normal_th2}`;
      break;
    case 3:
      btnClass += ` ${styles.btn_normal_th3}`;
      break;
  }

  return (
    <Button className={`${btnClass} ${className}`} action={action}>
      {children}
    </Button>
  );
}
