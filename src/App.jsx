import { createContext, useReducer } from "react";
import { actions } from "./globals";
import Button from "./Button/Button";
import styles from "./App.module.css";

export const CalculatorContext = createContext();

const reducer = (state, action) => {
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
      }

      return {
        ...state,
        screenContent: `${state.screenContent}${action.value}`,
      };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    screenContent: "0",
    operand: NaN,
    operation: "",
  });

  return (
    <div className={styles.container}>
      <CalculatorContext.Provider value={dispatch}>
        <h1 className="sr-only">Calculator App</h1>

        <div className={styles.calculator}>
          <header className={styles.calculator__header}>
            <p>calc</p>
            <div className="theme-toggler">
              <p>THEME</p>
              <div className="toggle"></div>
            </div>
          </header>

          <div className={styles.calculator__screen}>{state.screenContent}</div>

          <div className={styles.calculator__keypad}>
            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
            <Button action={actions.DELETE}>DEL</Button>
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
            <Button className="grid-col-span-2" action={actions.RESET}>
              RESET
            </Button>
            <Button className="grid-col-span-2" action={actions.COMPUTE}>
              =
            </Button>
          </div>
        </div>
      </CalculatorContext.Provider>
    </div>
  );
}
