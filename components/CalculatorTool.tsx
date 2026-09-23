import React, { useState, useEffect, useCallback } from 'react';
import { ToolDef } from '../types';
import { RotateCcw, Delete, Equal } from 'lucide-react';

interface CalculatorToolProps {
  tool: ToolDef;
}

const CalculatorTool: React.FC<CalculatorToolProps> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // Memoize handleButtonClick so it can be used in useEffect
  const handleButtonClick = useCallback((value: string) => {
    if (value === '=') {
      if (!input) return;
      try {
        // Sanitize input to allow only numbers and operators
        const sanitizedInput = input.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-new-func
        const calculate = new Function('return ' + sanitizedInput);
        const calcResult = calculate();
        
        // Handle division by zero or other non-finite results
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
         // If there was a previous result and user types a number, start fresh.
         // If user types an operator, continue with the result as the base.
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
        handleButtonClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick]);

  const getButtonClass = (btn: string) => {
    const baseClass = "h-14 sm:h-16 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 shadow-sm flex items-center justify-center select-none";
    
    if (btn === '=') {
      return `${baseClass} bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/20`;
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
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Calculator Interface */}
      <div className="w-full max-w-sm mx-auto lg:mx-0">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          
          {/* Display */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 mb-6 text-right border border-slate-100 dark:border-slate-800 shadow-inner h-28 sm:h-32 flex flex-col justify-end overflow-hidden">
            <div className="text-slate-400 text-sm mb-1 h-6 font-medium truncate">
              {history.length > 0 ? history[0].split('=')[0] : ''}
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight break-all">
              {input || '0'}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Row 1 */}
            <button onClick={() => handleButtonClick('C')} className={getButtonClass('C')}>AC</button>
            <button onClick={() => handleButtonClick('DEL')} className={getButtonClass('DEL')}><Delete className="w-5 h-5" /></button>
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

            {/* Row 4 & 5 Logic */}
            {/* Digits 1,2,3 */}
            <button onClick={() => handleButtonClick('1')} className={getButtonClass('1')}>1</button>
            <button onClick={() => handleButtonClick('2')} className={getButtonClass('2')}>2</button>
            <button onClick={() => handleButtonClick('3')} className={getButtonClass('3')}>3</button>
            
            {/* Equal Sign spans 2 rows vertically on the right */}
            <button onClick={() => handleButtonClick('=')} className={`${getButtonClass('=')} row-span-2 h-auto`}>
                <Equal className="w-6 h-6" />
            </button>

            {/* Row 5 (0 and .) */}
            <button onClick={() => handleButtonClick('0')} className={`${getButtonClass('0')} col-span-2`}>0</button>
            <button onClick={() => handleButtonClick('.')} className={getButtonClass('.')}>.</button>
          </div>
        </div>
        
        {/* Keyboard Hint */}
        <p className="text-center text-xs text-slate-400 mt-4 hidden sm:block">
          Keyboard shortcuts: Enter (=), Esc (AC), Backspace (DEL)
        </p>
      </div>

      {/* History Panel */}
      <div className="w-full max-w-sm mx-auto lg:mx-0 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center">
                <RotateCcw className="w-4 h-4 mr-2 text-slate-400" /> History
            </h3>
            <button 
                onClick={() => setHistory([])}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
                Clear
            </button>
        </div>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {history.length > 0 ? (
                history.map((item, index) => {
                    const [eq, res] = item.split('=');
                    return (
                        <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="text-slate-500 text-sm font-medium">{eq}</span>
                            <span className="text-slate-900 dark:text-white font-bold text-lg">= {res}</span>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-10 text-slate-400">
                    <p className="text-sm">No calculations yet.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorTool;