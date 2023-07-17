import { useContext } from "react";
import { ThemeContext } from "../App";
import { themes } from "../globals";
import styles from "./ThemeToggler.module.css";

export default function ThemeToggler({ setTheme }) {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.toggler}>
      <ul className={`${styles.toggler__themeList} fs-small`} role="list">
        {themes.map((theme, i) => (
          <li key={theme} title={theme}>
            <button
              type="button"
              onClick={() => {
                setTheme(i + 1);
              }}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.toggler__slider}>
        <button
          type="button"
          className={styles.toggler__btn}
          style={{
            translate: `calc(${theme - 1} * (var(--inner-slider-width) / ${
              themes.length - 1
            }) - var(--radius)) 0`,
          }}
          onClick={() => {
            if (theme >= themes.length) {
              setTheme(1);
              return;
            }
            setTheme(theme + 1);
          }}
        />
      </div>
    </div>
  );
}
