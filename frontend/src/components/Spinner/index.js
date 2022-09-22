import React from 'react';
import {
  Container,
  SpinnerContainer,
  SpinnerWrpper,
  SpinnerItem,
} from './styles';

function Spinner({ color }) {
  return (
    <Container>
      <SpinnerContainer>
        <SpinnerWrpper>
          <SpinnerItem color={color} />
        </SpinnerWrpper>
      </SpinnerContainer>
    </Container>
  );
}

export { Spinner };
