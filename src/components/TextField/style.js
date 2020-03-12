
import styled, { css } from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  ${(props) => props.value === 'Disabled Input'
    && css`
      width: 100%;

    `};
    ${(props) => props.value === 'Accessible'
    && css`
      width: 100%;
      background-color: white;
    `};
    ${(props) => props.value === 101
    && css`
      width: 100%;
      background-color: white;
      border-color: #D35400;
    `};
    ${(props) => props.error
      && css`
        width: 100%;
        background-color: white;
        border-color: red;
      `};
`;

const Para = styled.p`
      font-weight:bold
`;

const Div = styled.div`
      padding: 2%;
      border: 1px solid black;
      border-radius: 4px;

`;

const P = styled.p`
     color: red;
     margin: auto;
`;

export default Input;

export { Para, Div, P };
