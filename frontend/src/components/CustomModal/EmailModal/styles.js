import styled from 'styled-components';
import { COLOR } from '../../../constants';

const EmailBody = styled.div`
  display: flex;
  height: calc(100% - 60px);
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  font-size: 15px;
`;

const EmailInput = styled.input`
  padding: 10px 15px;
`;

const EmailButton = styled.button`
  padding: 10px 15px;
  border: 0;
  color: #fdfdfd;
  background-color: ${COLOR.NAVY};
`;

export { EmailBody, EmailInput, EmailButton };
