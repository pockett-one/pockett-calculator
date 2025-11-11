import React, { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCalculatorKeyboard } from '../app/lib/useCalculatorKeyboard';

// Test component that uses the hook
function TestCalculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState('0');
  const [operation, setOperation] = React.useState<string | null>(null);
  const [previousValue, setPreviousValue] = React.useState<string | null>(null);
  const [newNumber, setNewNumber] = React.useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    setOperation(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(display);
      let result = 0;
      
      switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: result = current;
      }
      
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  useCalculatorKeyboard({
    onNumber: handleNumber,
    onDecimal: handleDecimal,
    onOperation: handleOperation,
    onEquals: handleEquals,
    onClear: handleClear,
    calculatorRef,
  });

  return (
    <div ref={calculatorRef} tabIndex={0} data-testid="calculator">
      <div data-testid="display">{display}</div>
      <button onClick={() => handleNumber('1')}>1</button>
      <button onClick={() => handleNumber('2')}>2</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={handleEquals}>=</button>
      <button onClick={handleClear}>C</button>
    </div>
  );
}

describe('useCalculatorKeyboard', () => {
  beforeEach(() => {
    // Clear any previous state
  });

  test('should input numbers via keyboard', () => {
    render(<TestCalculator />);
    const calculator = screen.getByTestId('calculator');
    const display = screen.getByTestId('display');
    
    calculator.focus();
    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: '3' });
    
    expect(display).toHaveTextContent('123');
  });

  test('should handle decimal point', () => {
    render(<TestCalculator />);
    const calculator = screen.getByTestId('calculator');
    const display = screen.getByTestId('display');
    
    calculator.focus();
    fireEvent.keyDown(window, { key: '3' });
    fireEvent.keyDown(window, { key: '.' });
    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '4' });
    
    expect(display).toHaveTextContent('3.14');
  });

  test('should clear with Escape key', () => {
    render(<TestCalculator />);
    const calculator = screen.getByTestId('calculator');
    const display = screen.getByTestId('display');
    
    calculator.focus();
    fireEvent.keyDown(window, { key: '5' });
    fireEvent.keyDown(window, { key: '6' });
    expect(display).toHaveTextContent('56');
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(display).toHaveTextContent('0');
  });

  test('should clear with C key', () => {
    render(<TestCalculator />);
    const calculator = screen.getByTestId('calculator');
    const display = screen.getByTestId('display');
    
    calculator.focus();
    fireEvent.keyDown(window, { key: '7' });
    fireEvent.keyDown(window, { key: '8' });
    expect(display).toHaveTextContent('78');
    
    fireEvent.keyDown(window, { key: 'c' });
    expect(display).toHaveTextContent('0');
  });
});

