import { useState } from "react"
import "./App.css"

function App() {
  const [currentValue, setCurrentValue] = useState("")
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [calc, setCalc] = useState(false)
  const keys = [
    { id: "clear", value: "AC", type: "function" },
    { id: "divide", value: "/", type: "operator" },
    { id: "multiply", value: "*", type: "operator" },
    { id: "seven", value: "7", type: "number" },
    { id: "eight", value: "8", type: "number" },
    { id: "nine", value: "9", type: "number" },
    { id: "subtract", value: "-", type: "operator" },
    { id: "four", value: "4", type: "number" },
    { id: "five", value: "5", type: "number" },
    { id: "six", value: "6", type: "number" },
    { id: "add", value: "+", type: "operator" },
    { id: "one", value: "1", type: "number" },
    { id: "two", value: "2", type: "number" },
    { id: "three", value: "3", type: "number" },
    { id: "equals", value: "=", type: "operator" },
    { id: "zero", value: "0", type: "number" },
    { id: "decimal", value: ".", type: "number" },
  ]
  console.log("currentValue", currentValue)
  console.log("result", result)
  const handleTakeInput = (id) => {
    const value = document.getElementById(id).innerText
    const lastValue = currentValue[currentValue.length - 1]
    console.log("lastValue", lastValue)
    switch (result) {
      case "":
        if (id === "clear") {
          setCalc(false)
          setCurrentValue("")
          setInput(0)
        } else if (id === "equals") {
          if (currentValue === "") {
            setResult("")
          } else {
            setResult(eval(currentValue))
            setCurrentValue(`${currentValue + value} ${result}`)
            setCalc(true)
          }
        } else if (id === "decimal") {
          if (currentValue === "") {
            setCurrentValue("0.")
            setInput(".")
          } else if (lastValue === ".") {
            setCurrentValue(currentValue)
            // setInput(currentValue)
          } else {
            setCurrentValue(currentValue + value)
            setInput(value)
          }
        } else if (id === "divide" || id === "multiply") {
          if (currentValue === "") {
            setCurrentValue("")
            setInput(value)
          } else if (lastValue === "/" || lastValue === "*") {
            setCurrentValue(currentValue)
            setInput(value)
          } else {
            setCurrentValue(currentValue + value)
            setInput(value)
          }
        } else if (id === "subtract" || id === "add") {
          if (lastValue === "-" || lastValue === "+") {
            setCurrentValue(currentValue)
            setInput(value)
          } else {
            setCurrentValue(currentValue + value)
            setInput(value)
          }
        }
        else {
          setCurrentValue(currentValue + value)
          setInput(value)
        }
        break
      default:
        if (id === "clear") {
          setCalc(false)
          setCurrentValue("")
          setInput(0)
          setResult("")
        } else if (
          id === "divide" ||
          id === "multiply" ||
          id === "subtract" ||
          id === "add"
        ) {
          setCalc(false)
          setCurrentValue(`${result} ${value}`)
          setInput(value)
          setResult("")
        }
    }
  }
  return (
    <div className="calculator-container">
      <div className="screen-container">
        <div id="input" type="text" className="calculator-screen">
          {`${calc ? `${currentValue} ${result}` : currentValue}`}
        </div>
        <div id="display" type="text" className="calculator-screen">
          {calc ? result : input}
        </div>
        <div className="key-container">
          {keys.map((key) => (
            <button
              id={key.id}
              className="button"
              key={key.id}
              onClick={() => handleTakeInput(key.id)}
            >
              {key.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
