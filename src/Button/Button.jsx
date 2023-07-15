import { useContext } from "react";
import { CalculatorContext } from "../App";
import { actions } from "../globals";
import styles from "./Button.module.css";

export default function Button({
  children,
  className,
  action = actions.WRITE,
}) {
  const dispatch = useContext(CalculatorContext);

  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      onClick={() => dispatch({ type: action, value: children })}
    >
      {children}
    </button>
  );
}
