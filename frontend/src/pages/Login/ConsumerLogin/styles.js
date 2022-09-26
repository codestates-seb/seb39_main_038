import styled from 'styled-components';

const ButtonInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Text = styled.span`
  font-weight: 500;
`;

export { ButtonInner, TextBox, Text };
