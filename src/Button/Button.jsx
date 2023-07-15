import { useContext } from "react";
import { CalculatorContext } from "../App";
import { actions } from "../globals";

export default function Button({
  children,
  className,
  action = actions.WRITE,
}) {
  const dispatch = useContext(CalculatorContext);

  return (
    <button
      type="button"
      className={className}
      onClick={() => dispatch({ type: action, value: children })}
    >
      {children}
    </button>
  );
}
