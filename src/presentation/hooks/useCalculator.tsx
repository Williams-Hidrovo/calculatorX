import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firsFormulaPart = formula.split(' ').at(0);
      setFormula(`${firsFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = undefined;
    setFormula('0');
  };

  const deleteOperation = () => {
    if (number.length < 3) {
      if (number.includes('-')) return setNumber('0');
      if (number.length < 2) return setNumber('0');
    }
    if (number !== '0') {
      return setNumber(number.slice(0, -1));
    }
  };

  const toggleSing = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numero: string) => {
    if (numero === '.' && number.includes('.')) return;
    if (numero === '.') return setNumber(number + numero);
    if (number === '0' || number === '-0') {
      if (numero === '0') return;
    }
    if (number === '0') return setNumber(numero);
    if (number === '-0') return setNumber('-' + numero);
    setNumber(number + numero);
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else setPrevNumber(number);
    setNumber('0');
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const divineOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ');

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) {
      return num1;
    }
    switch (lastOperation.current) {
      case Operator.add:
        return num1 + num2;

      case Operator.subtract:
        return num1 - num2;

      case Operator.divide:
        return num1 / num2;

      case Operator.multiply:
        return num1 * num2;

      default:
        throw new Error('operacion no valida');
    }
  };

  return {
    //properties
    number,
    prevNumber,
    formula,
    //methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSing,
    multiplyOperation,
    divineOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  };
};
