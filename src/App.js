import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [lastValue, setLastValue] = useState('');
  const [decimalClicked, setDecimalClicked] = useState(false);

  const handleNumberClick = (num) => {
    if (displayValue.length < 8) {
      if (displayValue === '0' || operator) {
        setDisplayValue(num);
        setCurrentValue(num);
        setOperator('');
      } else {
        setDisplayValue(displayValue + num);
        setCurrentValue(displayValue + num);
      }
    }
  }

  const handleOperatorClick = (op) => {
    if (currentValue !== ''){
      if (lastValue !== '') {
        calculateResult();
        setOperator(op);
        setLastValue(displayValue);
        setCurrentValue('');
        setDecimalClicked(false);
      }
      setOperator(op);
      setLastValue(currentValue);
      setCurrentValue('');
      setDecimalClicked(false);
    }
  }

  const handleAllClearClick = () => {
    setCurrentValue('');
    setLastValue('');
    setOperator('');
    setDecimalClicked(false);
    setDisplayValue('0');
  }
  

  const handleSignChange = () => {
    if (currentValue !== '' && currentValue !== '0') {
      setCurrentValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
      setDisplayValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    }
  }

  const handleDecimalClick = () => {
    if (!decimalClicked && displayValue.length < 8) {
      setDisplayValue((prev) => prev + '.');
      setCurrentValue((prev) => prev + '.');
      setDecimalClicked(true);
    } 
  }

  const handleEqualClick = () => {
    if (lastValue !== '' && currentValue !== '') {
      calculateResult();
      setOperator('');
      setLastValue('');
      setDecimalClicked(false);
    }
  }

  const calculateResult = () => {
    const num1 = parseFloat(lastValue);
    const num2 = parseFloat(currentValue);
    console.log(num1, num2);
    let result;

    switch(operator) {
      case '÷':
        result = num1 / num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '+':
        result = num1 + num2;
        break;
      default:
        result = 'ERROR'
        break;
    }

    console.log(result);
    console.log(typeof(result));
    const resultString = result.toString();
    if (resultString.length <= 8) {
      setDisplayValue(resultString);
      setCurrentValue(resultString);
    } else {
      // Truncate the result to 8 characters
      const truncatedResult = resultString.slice(0, 8);
      setDisplayValue(truncatedResult);
      setCurrentValue(truncatedResult);
    }
    
  }
  return (
    <>
      {/* Calculator container */}
      <div className="calculator-rows">
        
        {/* Display value of the calculator */}
        <div className="calculator-display">
          <div className="display-value">{displayValue}</div>
        </div>

          {/* 1st row of the calculator */} 
        <div className="calculator-row first">
          <button className="square" onClick={handleAllClearClick}>AC</button>
          <button className="square" onClick={handleSignChange}>±</button>
          <button className="square">%</button>
          <button className="square" onClick={() => handleOperatorClick('÷')}>÷</button>
        </div>

        {/* 2nd row of the calculator */} 
        <div className="calculator-row second">
          <button className="square" onClick={() => handleNumberClick('7')}>7</button>
          <button className="square" onClick={() => handleNumberClick('8')}>8</button>
          <button className="square" onClick={() => handleNumberClick('9')}>9</button>
          <button className="square" onClick={() => handleOperatorClick('x')}>x</button>
        </div>

        {/* 3rd row of the calculator */} 
        <div className="calculator-row third">
          <button className="square" onClick={() => handleNumberClick('4')}>4</button>
          <button className="square" onClick={() => handleNumberClick('5')}>5</button>
          <button className="square" onClick={() => handleNumberClick('6')}>6</button>
          <button className="square" onClick={() => handleOperatorClick('-')}>-</button>
        </div>

        {/* 4th row of the calculator */} 
        <div className="calculator-row fourth">
          <button className="square" onClick={() => handleNumberClick('1')}>1</button>
          <button className="square" onClick={() => handleNumberClick('2')}>2</button>
          <button className="square" onClick={() => handleNumberClick('3')}>3</button>
          <button className="square" onClick={() => handleOperatorClick('+')}>+</button>
        </div>

        {/* 5th row of the calculator */} 
        <div className="calculator-row fifth">
          <button className="square" onClick={() => handleNumberClick('0')}>0</button>
          <button className="square" onClick={handleDecimalClick}>.</button>
          <button className="square equal" onClick={handleEqualClick}>=</button>
        </div>
      </div>
    </>
  );
}

export default App;