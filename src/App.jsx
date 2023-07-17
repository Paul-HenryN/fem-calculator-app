import { createContext, useReducer, useState } from "react";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";
import { MAX_WRITE, actions, operations } from "./globals";
import styles from "./App.module.css";
import ThemeToggler from "./ThemeToggler/ThemeToggler";

export const CalculatorContext = createContext();
export const ThemeContext = createContext();

const initialState = {
  screenContent: "0",
  operand: NaN,
  operation: "",
  resultMode: false,
  setOperationMode: false,
  memoryContent: "",
};

function toOutput(number) {
  return number.toLocaleString("en-us", { maximumFractionDigits: 15 });
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
      if (state.screenContent.length >= MAX_WRITE) {
        return state;
      }

      if (state.resultMode) {
        return {
          ...state,
          screenContent: action.value,
          resultMode: false,
          memoryContent: "",
        };
      }

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
      if (
        isNaN(toNumber(state.screenContent.slice(0, -1))) ||
        state.screenContent.length === 1
      ) {
        return { ...state, screenContent: "0" };
      }

      return {
        ...state,
        screenContent: format(state.screenContent.slice(0, -1)),
      };

    case actions.RESET:
      return initialState;

    case actions.SET_OPERATION:
      if (state.setOperationMode) {
        return {
          ...state,
          operation: action.value,
          memoryContent: `${state.operand} ${action.value}`,
        };
      }

      return {
        ...state,
        screenContent: "0",
        operand: toNumber(state.screenContent),
        operation: action.value,
        setOperationMode: true,
        memoryContent: `${toNumber(state.screenContent)} ${action.value}`,
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
        ...state,
        screenContent: toOutput(result),
        operand: NaN,
        resultMode: true,
        setOperationMode: false,
        memoryContent: `${state.operand} ${state.operation} ${state.screenContent} =`,
      };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    default:
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

              <ThemeToggler setTheme={setTheme} />
            </header>

            <Screen
              screenContent={state.screenContent}
              memoryContent={state.memoryContent}
            />

            <Keypad />
          </div>
        </ThemeContext.Provider>
      </CalculatorContext.Provider>
    </div>
  );
}
