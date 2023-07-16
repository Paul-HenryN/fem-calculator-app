import Button from "../Button/Button";
import { actions } from "../globals";
import { ThemeContext } from "../App";
import styles from "./Keypad.module.css";
import { useContext } from "react";

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
      keypadClass += ` ${styles.calculator__keypad_th3}`;
      break;
  }

  return (
    <div className={keypadClass}>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Button className="fs-medium" action={actions.DELETE}>
        DEL
      </Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button action={actions.SET_OPERATION}>+</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button action={actions.SET_OPERATION}>-</Button>
      <Button>.</Button>
      <Button>0</Button>
      <Button action={actions.SET_OPERATION}>/</Button>
      <Button action={actions.SET_OPERATION}>x</Button>
      <Button className="fs-medium grid-col-span-2" action={actions.RESET}>
        RESET
      </Button>
      <Button className="fs-medium grid-col-span-2" action={actions.COMPUTE}>
        =
      </Button>
    </div>
  );
}
