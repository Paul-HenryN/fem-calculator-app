import { createContext, useReducer, useState } from "react";
import { actions, operations } from "./globals";
import Button from "./Button/Button";
import styles from "./App.module.css";

export const CalculatorContext = createContext();
export const ThemeContext = createContext();

function toOutput(number) {
  return number.toLocaleString("en-us");
}

function toNumber(str) {
  return parseFloat(str.replace(/,/g, ""));
}

function format(str) {
  return toOutput(toNumber(str));
}

const reducer = (state, action) => {
  let result = 0;

  switch (action.type) {
    case actions.WRITE:
      if (state.screenContent === "0") {
        if (action.value !== ".") {
          return { ...state, screenContent: action.value };
        }
      }

      if (action.value === ".") {
        if (state.screenContent.includes(".")) {
          return state;
        }

        return {
          ...state,
          screenContent: `${state.screenContent}${action.value}`,
        };
      }

      return {
        ...state,
        screenContent: format(`${state.screenContent}${action.value}`),
      };

    case actions.DELETE:
      if (state.screenContent.length === 1) {
        return { ...state, screenContent: "0" };
      }

      return {
        ...state,
        screenContent: format(state.screenContent.slice(0, -1)),
      };

    case actions.RESET:
      return { screenContent: "0", operand: NaN, operation: "" };

    case actions.SET_OPERATION:
      return {
        screenContent: "0",
        operand: toNumber(state.screenContent),
        operation: action.value,
      };

    case actions.COMPUTE:
      if (isNaN(state.operand)) {
        return state;
      }

      switch (state.operation) {
        case operations.ADD:
          result = state.operand + toNumber(state.screenContent);
          break;
        case operations.SUBSTRACT:
          result = state.operand - toNumber(state.screenContent);
          break;
        case operations.MULTIPLY:
          result = state.operand * toNumber(state.screenContent);
          break;
        case operations.DIVIDE:
          result = state.operand / toNumber(state.screenContent);
          break;
      }

      return {
        screenContent: toOutput(result),
        operand: NaN,
      };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    screenContent: "0",
    operand: NaN,
    operation: "",
  });

  const [theme, setTheme] = useState(3);

  let containerClass = styles.container;
  let screenClass = styles.calculator__screen;
  let keypadClass = styles.calculator__keypad;

  switch (theme) {
    case 1:
      containerClass += ` ${styles.container_th1}`;
      screenClass += ` ${styles.calculator__screen_th1}`;
      keypadClass += ` ${styles.calculator__keypad_th1}`;
      break;
    case 2:
      containerClass += ` ${styles.container_th2}`;
      screenClass += ` ${styles.calculator__screen_th2}`;
      keypadClass += ` ${styles.calculator__keypad_th2}`;
      break;
    case 3:
      containerClass += ` ${styles.container_th3}`;
      screenClass += ` ${styles.calculator__screen_th3}`;
      keypadClass += ` ${styles.calculator__keypad_th3}`;
      break;
  }

  return (
    <div className={containerClass}>
      <CalculatorContext.Provider value={dispatch}>
        <ThemeContext.Provider value={theme}>
          <h1 className="sr-only">Calculator App</h1>

          <div className={styles.calculator}>
            <header className={styles.calculator__header}>
              <p>calc</p>
              <div className="theme-toggler">
                <p className="fs-small">THEME</p>
                <div className="toggle"></div>
              </div>
            </header>

            <div className={`${screenClass} fs-big`}>{state.screenContent}</div>

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
              <Button
                className="fs-medium grid-col-span-2"
                action={actions.RESET}
              >
                RESET
              </Button>
              <Button
                className="fs-medium grid-col-span-2"
                action={actions.COMPUTE}
              >
                =
              </Button>
            </div>
          </div>
        </ThemeContext.Provider>
      </CalculatorContext.Provider>
    </div>
  );
}
