import { useContext } from "react";
import { CalculatorContext, ThemeContext } from "../App";
import { actions } from "../globals";
import styles from "./Button.module.css";

export default function Button({
  children,
  className,
  action = actions.WRITE,
}) {
  const dispatch = useContext(CalculatorContext);
  const theme = useContext(ThemeContext);

  let btnClass = styles.btn;

  switch (theme) {
    case 1:
      btnClass += ` ${styles.btn_th1}`;
      break;
    case 2:
      btnClass += ` ${styles.btn_th2}`;
      break;
    case 3:
      btnClass += ` ${styles.btn_th3}`;
  }

  return (
    <button
      type="button"
      className={`${btnClass} ${className}`}
      onClick={() => dispatch({ type: action, value: children })}
    >
      {children}
    </button>
  );
}
