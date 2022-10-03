import React from 'react';
import {
  Container,
  SpinnerContainer,
  SpinnerWrpper,
  SpinnerItem,
} from './styles';

function Spinner({ color, size }) {
  return (
    <Container>
      <SpinnerContainer size={size}>
        <SpinnerWrpper>
          <SpinnerItem color={color} size={size} />
        </SpinnerWrpper>
      </SpinnerContainer>
    </Container>
  );
}

export { Spinner };
