export default function App() {
  return (
    <div className="app-container">
      <h1 className="sr-only">Calculator App</h1>
      <div className="calculator">
        <header>
          <p>calc</p>
          <div className="theme-toggler">
            <p>THEME</p>
            <div className="toggle"></div>
          </div>
        </header>

        <div className="calculator__screen">399,981</div>
        <div className="calculator__keypad">
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
          <button type="button">RESET</button>
          <button type="button">=</button>
        </div>
      </div>
    </div>
  );
}
