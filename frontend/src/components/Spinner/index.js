import React from 'react';
import {
  Container,
  SpinnerContainer,
  SpinnerWrpper,
  SpinnerItem,
} from './styles';

function Spinner({ color, size, scroll, lastItemRef = null }) {
  return (
    <Container scroll={scroll}>
      <SpinnerContainer size={size}>
        <SpinnerWrpper>
          <SpinnerItem color={color} size={size} ref={lastItemRef} />
        </SpinnerWrpper>
      </SpinnerContainer>
    </Container>
  );
}

export { Spinner };
