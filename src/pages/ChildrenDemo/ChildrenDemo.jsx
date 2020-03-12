import React from 'react';
import { Math } from '../../components/index';

const CalculatorDemo = () => (
  <>
    <Math first={10} second={20} operator="+" />
    <Math first={10} second={20} operator="-" />
    <Math first={10} second={20} operator="*" />
    <Math first={20} second={10} operator="/" />
    <Math first={20} second={0} operator="*">
      {(first, second, operator, result) => {
        switch (operator) {
        case '+': return (
          <p>
            Addition of
            {' '}
            {first}
            {' '}
            and
            {' '}
            {second}
            {' '}
            is
            {' '}
            {result}
          </p>
        );
        case '-': return (
          <p>
            Subtraction of
            {' '}
            {first}
            {' '}
            and
            {' '}
            {second}
            {' '}
            is
            {' '}
            {result}
          </p>
        );
        case '*': return (
          <p>
            Multiplication of
            {' '}
            {first}
            {' '}
            and
            {' '}
            {second}
            {' '}
            is
            {' '}
            {result}
          </p>
        );
        case '/': return (
          <p>
            Division of
            {' '}
            {first}
            {' '}
            and
            {' '}
            {second}
            {' '}
            is
            {' '}
            {result}
          </p>
        );
        default: return (
          <p>
            {' '}
            {first}
            {' '}
            {operator}
            {' '}
            {second}
            {' '}
            {'='}
            {' '}
            {result}
          </p>
        );
        }
      }}
    </Math>

  </>
);

export default CalculatorDemo;
