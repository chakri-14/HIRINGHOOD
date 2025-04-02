import { useState } from "react";
import "./App.css";

const evaluateExpression = (expression: string): number => {
  const addSubtractTerms = expression.split(/(?<=[\d)])[+-]/).map((term) => term.trim());
  let result = 0;

  for (let i = 0; i < addSubtractTerms.length; i++) {
    let term = addSubtractTerms[i];
    const isNegative = i > 0 && expression.split(/[+-]/)[i - 1].endsWith("-");

    const tokens = term.match(/(\d+\.?\d*|[*/%^])/)?.slice(1) || [term];
    let termResult = parseFloat(tokens[0] || "0");

    for (let j = 1; j < tokens.length; j += 2) {
      const operator = tokens[j];
      const nextNum = parseFloat(tokens[j + 1] || "0");
      if (isNaN(nextNum)) throw new Error("Syntax Error");

      switch (operator) {
        case "*":
          termResult *= nextNum;
          break;
        case "/":
          if (nextNum === 0) throw new Error("Cannot divide by zero!");
          termResult /= nextNum;
          break;
        case "%":
          termResult %= nextNum;
          break;
        case "^":
          termResult = Math.pow(termResult, nextNum);
          break;
        default:
          throw new Error("Invalid Operator");
      }
    }

    result = i === 0 ? termResult : isNegative ? result - termResult : result + termResult;
  }

  return Number(result.toFixed(8));
};

const App = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        if (!input) throw new Error("Empty Input");
        const result = evaluateExpression(input);
        const historyEntry = `${input} = ${result}`;
        setHistory((prev) => [historyEntry, ...prev].slice(0, 10));
        setInput(result.toString());
      } catch (e) {
        alert(e.message || "Invalid Input");
        setInput("");
      }
    } else if (value === "√") {
      try {
        const num = parseFloat(input);
        if (isNaN(num)) throw new Error("Please enter a number");
        if (num < 0) throw new Error("Cannot calculate square root of negative numbers!");
        const result = Math.sqrt(num).toFixed(8);
        setHistory((prev) => [`√${input} = ${result}`, ...prev].slice(0, 10));
        setInput(result.toString());
      } catch (e) {
        alert(e.message || "Invalid Input");
        setInput("");
      }
    } else if (value === "x²") {
      try {
        const num = parseFloat(input);
        if (isNaN(num)) throw new Error("Please enter a number");
        const result = (num * num).toFixed(8);
        setHistory((prev) => [`${input}² = ${result}`, ...prev].slice(0, 10));
        setInput(result.toString());
      } catch (e) {
        alert(e.message || "Invalid Input");
        setInput("");
      }
    } else {
      const lastChar = input.slice(-1);
      const operators = ["+", "-", "*", "/", "%", "^"];
      if (
        (operators.includes(value) && operators.includes(lastChar)) ||
        (value === "." && (lastChar === "." || input.split(/[+\-*/%^]/).pop()?.includes(".")))
      ) {
        return;
      }
      setInput((prev) => prev + value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Enter") handleClick("=");
    else if (key === "Backspace" || key === "Delete") handleClick("⌫");
    else if (key.toLowerCase() === "c") handleClick("C");
    else if (!isNaN(Number(key)) || ["+", "-", "*", "/", "%", "^", "."].includes(key)) {
      handleClick(key);
    }
  };

  return (
    <div className="calculator">
      <input
        value={input}
        readOnly
        className="display"
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <div className="button-grid">
        {["7", "8", "9", "/", "^", "4", "5", "6", "*", "√", "1", "2", "3", "-", "x²", "0", ".", "=", "+", "%"].map(
          (btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`calc-button ${
                ["+", "-", "*", "/", "^", "%", "="].includes(btn)
                  ? "operator"
                  : btn === "√" || btn === "x²"
                  ? "function"
                  : "number"
              }`}
            >
              {btn}
            </button>
          )
        )}
        <button onClick={() => handleClick("C")} className="calc-button clear span-full">
          C
        </button>
        <button onClick={() => handleClick("⌫")} className="calc-button function span-full">
          ⌫
        </button>
      </div>
      <div className="history">
        <h3>History</h3>
        {history.length === 0 ? (
          <p>No calculations yet</p>
        ) : (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;