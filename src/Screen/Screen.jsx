import { useContext } from "react";
import { ThemeContext } from "../App";
import styles from "./Screen.module.css";

export default function Screen({ children }) {
  const theme = useContext(ThemeContext);
  let screenClass = styles.calculator__screen;

  switch (theme) {
    case 1:
      screenClass += ` ${styles.calculator__screen_th1}`;
      break;
    case 2:
      screenClass += ` ${styles.calculator__screen_th2}`;
      break;
    case 3:
    default:
      screenClass += ` ${styles.calculator__screen_th3}`;
      break;
  }

  return <div className={`${screenClass} fs-big`}>{children}</div>;
}
