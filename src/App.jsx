import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.container}>
      <h1 className="sr-only">Calculator App</h1>

      <div className={styles.calculator}>
        <header className={styles.calculator__header}>
          <p>calc</p>
          <div className="theme-toggler">
            <p>THEME</p>
            <div className="toggle"></div>
          </div>
        </header>

        <div className={styles.calculator__screen}>399,981</div>

        <div className={styles.calculator__keypad}>
          <button type="button">7</button>
          <button type="button">8</button>
          <button type="button">9</button>
          <button type="button">DEL</button>
          <button type="button">4</button>
          <button type="button">5</button>
          <button type="button">6</button>
          <button type="button">+</button>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">-</button>
          <button type="button">.</button>
          <button type="button">0</button>
          <button type="button">/</button>
          <button type="button">x</button>
          <button type="button" className="grid-col-span-2">
            RESET
          </button>
          <button type="button" className="grid-col-span-2">
            =
          </button>
        </div>
      </div>
    </div>
  );
}
