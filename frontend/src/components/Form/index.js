import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const FormText = styled.p`
  color: #666;
  font-size: 14px;
  &::before {
    content: '·';
  }
`;

const FormInput = styled.input`
  font-size: 14px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
`;

const FormButton = styled.button`
  font-size: 15px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: transparent;
`;

export { FormContainer, FormWrapper, FormText, FormInput, FormButton };
