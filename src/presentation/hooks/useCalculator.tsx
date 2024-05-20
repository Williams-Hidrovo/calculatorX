import {useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState();
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
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
    const num1 = Number(number); //NaN
    const num2 = Number(prevNumber);
    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        break;

      case Operator.subtract:
        setNumber(`${num2 - num1}`);
        break;

      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;

      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;

      default:
        throw new Error('operacion no valida');
    }
    setPrevNumber('0');
  };

  return {
    //properties
    number,
    prevNumber,

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
