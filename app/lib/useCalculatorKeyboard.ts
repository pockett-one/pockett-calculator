import { useEffect, useRef, RefObject } from 'react';

interface UseCalculatorKeyboardOptions {
  onNumber: (num: string) => void;
  onDecimal: () => void;
  onOperation: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onScientific?: (func: string) => void;
  enabled?: boolean;
  calculatorRef?: RefObject<HTMLElement | null>;
}

/**
 * Custom hook for handling keyboard input in calculators
 * Only processes keyboard events when the calculator is in focus
 */
export function useCalculatorKeyboard({
  onNumber,
  onDecimal,
  onOperation,
  onEquals,
  onClear,
  onScientific,
  enabled = true,
  calculatorRef,
}: UseCalculatorKeyboardOptions) {
  const isFocusedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if calculator is focused or if no ref is provided (global mode)
      if (calculatorRef) {
        const calculatorElement = calculatorRef.current;
        if (!calculatorElement) return;
        
        // Check if the active element is within the calculator
        const activeElement = document.activeElement;
        
        // Also check if calculator element itself is focused
        const isCalculatorFocused = calculatorElement === activeElement || calculatorElement.contains(activeElement);
        
        // Only process if calculator is focused
        if (!isCalculatorFocused && !isFocusedRef.current) {
          return;
        }
      }

      const key = event.key;
      const keyCode = event.keyCode || event.which;

      // Prevent default for calculator keys to avoid page scrolling or other browser actions
      if (
        /^[0-9+\-*/=.]$/.test(key) ||
        key === 'Enter' ||
        key === 'Escape' ||
        key.toLowerCase() === 'c' ||
        (keyCode >= 96 && keyCode <= 105) || // Numpad 0-9
        keyCode === 110 || // Numpad decimal
        keyCode === 107 || // Numpad +
        keyCode === 109 || // Numpad -
        keyCode === 106 || // Numpad *
        keyCode === 111 // Numpad /
      ) {
        event.preventDefault();
      }

      // Number keys (0-9) - both regular and numpad
      if (/^[0-9]$/.test(key)) {
        onNumber(key);
      } else if (keyCode >= 96 && keyCode <= 105) {
        // Numpad 0-9: keyCode 96 = Numpad0, 97 = Numpad1, ..., 105 = Numpad9
        const num = String(keyCode - 96);
        onNumber(num);
      }

      // Decimal point (both regular and numpad)
      else if (key === '.' || keyCode === 110) {
        onDecimal();
      }

      // Operators
      else if (key === '+' || keyCode === 107) { // NumpadAdd
        onOperation('+');
      }
      else if (key === '-' || keyCode === 109 || keyCode === 189) { // NumpadSubtract or Minus
        onOperation('-');
      }
      else if (key === '*' || keyCode === 106 || (keyCode === 56 && event.shiftKey)) { // NumpadMultiply
        onOperation('×');
      }
      else if (key === '/' || keyCode === 111 || keyCode === 191) { // NumpadDivide or Slash
        onOperation('÷');
      }

      // Equals
      else if (key === 'Enter' || key === '=' || keyCode === 13 || keyCode === 187) {
        onEquals();
      }

      // Clear
      else if (key === 'Escape' || (key.toLowerCase() === 'c' && !event.ctrlKey && !event.metaKey)) {
        onClear();
      }

      // Scientific functions (if provided)
      else if (onScientific) {
        if (key.toLowerCase() === 's' && event.shiftKey) {
          onScientific('sin');
        } else if (key.toLowerCase() === 'c' && event.shiftKey) {
          onScientific('cos');
        } else if (key.toLowerCase() === 't' && event.shiftKey) {
          onScientific('tan');
        }
      }
    };

    const handleFocus = () => {
      isFocusedRef.current = true;
    };

    const handleBlur = () => {
      // Delay blur to allow for button clicks
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (calculatorRef?.current && !calculatorRef.current.contains(activeElement)) {
          isFocusedRef.current = false;
        }
      }, 100);
    };

    const handleClick = (event: MouseEvent) => {
      if (calculatorRef?.current && calculatorRef.current.contains(event.target as Node)) {
        isFocusedRef.current = true;
        // Focus the calculator container to enable keyboard input
        if (calculatorRef.current instanceof HTMLElement) {
          calculatorRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    if (calculatorRef?.current) {
      const calculatorElement = calculatorRef.current;
      calculatorElement.addEventListener('focus', handleFocus, true);
      calculatorElement.addEventListener('blur', handleBlur, true);
      calculatorElement.addEventListener('click', handleClick);
      
      // Make calculator focusable
      if (calculatorElement instanceof HTMLElement) {
        calculatorElement.setAttribute('tabindex', '0');
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const calculatorElement = calculatorRef?.current;
      if (calculatorElement) {
        calculatorElement.removeEventListener('focus', handleFocus, true);
        calculatorElement.removeEventListener('blur', handleBlur, true);
        calculatorElement.removeEventListener('click', handleClick);
      }
    };
  }, [onNumber, onDecimal, onOperation, onEquals, onClear, onScientific, enabled, calculatorRef]);
}

