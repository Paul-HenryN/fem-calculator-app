import NormalButton from "../Buttons/NormalButton/NormalButton";
import { actions } from "../globals";
import { ThemeContext } from "../App";
import styles from "./Keypad.module.css";
import { useContext } from "react";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";

export default function Keypad() {
  const theme = useContext(ThemeContext);
  let keypadClass = styles.calculator__keypad;

  switch (theme) {
    case 1:
      keypadClass += ` ${styles.calculator__keypad_th1}`;
      break;
    case 2:
      keypadClass += ` ${styles.calculator__keypad_th2}`;
      break;
    case 3:
    default:
      keypadClass += ` ${styles.calculator__keypad_th3}`;
      break;
  }

  return (
    <div className={keypadClass}>
      <NormalButton>7</NormalButton>
      <NormalButton>8</NormalButton>
      <NormalButton>9</NormalButton>

      <SecondaryButton className="fs-medium" action={actions.DELETE}>
        DEL
      </SecondaryButton>

      <NormalButton>4</NormalButton>
      <NormalButton>5</NormalButton>
      <NormalButton>6</NormalButton>
      <NormalButton action={actions.SET_OPERATION}>+</NormalButton>
      <NormalButton>1</NormalButton>
      <NormalButton>2</NormalButton>
      <NormalButton>3</NormalButton>
      <NormalButton action={actions.SET_OPERATION}>-</NormalButton>
      <NormalButton>.</NormalButton>
      <NormalButton>0</NormalButton>
      <NormalButton action={actions.SET_OPERATION}>/</NormalButton>
      <NormalButton action={actions.SET_OPERATION}>x</NormalButton>

      <SecondaryButton
        className="fs-medium grid-col-span-2"
        action={actions.RESET}
      >
        RESET
      </SecondaryButton>

      <PrimaryButton
        className="fs-medium grid-col-span-2"
        action={actions.COMPUTE}
      >
        =
      </PrimaryButton>
    </div>
  );
}
