
import styled from 'styled-components';

const Select = styled.select`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Options = styled.option`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
`;

export default Select;

export {
  Para, Div, P, Options,
};
