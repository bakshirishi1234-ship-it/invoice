import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, X } from 'lucide-react';

const FloatingCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = useCallback((value: string) => {
    if (value === '=') {
      if (!input) return;
      try {
        const sanitizedInput = input.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-new-func
        const calculate = new Function('return ' + sanitizedInput);
        const calcResult = calculate();
        
        if (!isFinite(calcResult) || isNaN(calcResult)) {
          setResult('Error');
          setInput('');
          return;
        }

        const resultString = String(calcResult);
        setResult(resultString);
        setHistory(prev => [`${input} = ${resultString}`, ...prev].slice(0, 10));
        setInput(resultString);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(prev => prev.slice(0, -1));
    } else {
      if (result && !['+', '-', '*', '/'].includes(value)) {
        if (input === result) {
          setInput(value);
          setResult('');
        } else {
          setInput(prev => prev + value);
        }
      } else {
        setInput(prev => prev + value);
      }
    }
  }, [input, result]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/[0-9]/.test(key)) {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/', '.'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        handleButtonClick('DEL');
      } else if (key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick, isOpen]);

  const getButtonClass = (btn: string) => {
    const baseClass = "h-10 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-sm flex items-center justify-center select-none";
    
    if (btn === '=') {
      return `${baseClass} bg-primary-600 hover:bg-primary-700 text-white`;
    }
    if (['C', 'DEL'].includes(btn)) {
      return `${baseClass} bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200`;
    }
    if (['/', '*', '-', '+'].includes(btn)) {
      return `${baseClass} bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400`;
    }
    return `${baseClass} bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700`;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Open Calculator"
        title="Calculator"
      >
        <Calculator className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm pointer-events-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-600" />
                Calculator
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Calculator Content */}
            <div className="p-4">
              {/* Display */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 mb-4 text-right border border-slate-100 dark:border-slate-800 shadow-inner">
                <div className="text-slate-400 text-xs mb-1 h-4 font-medium truncate">
                  {history.length > 0 ? history[0].split('=')[0] : ''}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight break-all">
                  {input || '0'}
                </div>
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <button onClick={() => handleButtonClick('C')} className={getButtonClass('C')}>AC</button>
                <button onClick={() => handleButtonClick('DEL')} className={getButtonClass('DEL')}>DEL</button>
                <button onClick={() => handleButtonClick('/')} className={getButtonClass('/')}>÷</button>
                <button onClick={() => handleButtonClick('*')} className={getButtonClass('*')}>×</button>

                {/* Row 2 */}
                <button onClick={() => handleButtonClick('7')} className={getButtonClass('7')}>7</button>
                <button onClick={() => handleButtonClick('8')} className={getButtonClass('8')}>8</button>
                <button onClick={() => handleButtonClick('9')} className={getButtonClass('9')}>9</button>
                <button onClick={() => handleButtonClick('-')} className={getButtonClass('-')}>-</button>

                {/* Row 3 */}
                <button onClick={() => handleButtonClick('4')} className={getButtonClass('4')}>4</button>
                <button onClick={() => handleButtonClick('5')} className={getButtonClass('5')}>5</button>
                <button onClick={() => handleButtonClick('6')} className={getButtonClass('6')}>6</button>
                <button onClick={() => handleButtonClick('+')} className={getButtonClass('+')}>+</button>

                {/* Row 4 & 5 */}
                <button onClick={() => handleButtonClick('1')} className={getButtonClass('1')}>1</button>
                <button onClick={() => handleButtonClick('2')} className={getButtonClass('2')}>2</button>
                <button onClick={() => handleButtonClick('3')} className={getButtonClass('3')}>3</button>
                <button onClick={() => handleButtonClick('=')} className={`${getButtonClass('=')} row-span-2 h-auto`}>=</button>

                {/* Row 5 */}
                <button onClick={() => handleButtonClick('0')} className={`${getButtonClass('0')} col-span-2`}>0</button>
                <button onClick={() => handleButtonClick('.')} className={getButtonClass('.')}>.</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCalculator;
