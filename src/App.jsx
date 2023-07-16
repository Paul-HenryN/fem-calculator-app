import { createContext, useReducer, useState } from "react";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";
import { actions, operations } from "./globals";
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
        default:
          return state;
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

  const [theme, setTheme] = useState(1);

  let containerClass = styles.container;

  switch (theme) {
    case 1:
      containerClass += ` ${styles.container_th1}`;
      break;
    case 2:
      containerClass += ` ${styles.container_th2}`;
      break;
    case 3:
      containerClass += ` ${styles.container_th3}`;
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

            <Screen>{state.screenContent}</Screen>

            <Keypad />
          </div>
        </ThemeContext.Provider>
      </CalculatorContext.Provider>
    </div>
  );
}
