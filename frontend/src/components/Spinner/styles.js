import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  width: ${({ width }) => width + 60 || 150};
  height: ${({ height }) => height + 60 || 150};
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const SpinnerWrpper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const spinnerKeyframes = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const SpinnerItem = styled.div`
  box-sizing: content-box;
  position: absolute;
  width: ${({ width }) => width || 90};
  height: ${({ height }) => height || 90};
  border: 15px solid ${({ color }) => color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spinnerKeyframes} 1s linear infinite;
  top: 75px;
  left: 75px;
`;

SpinnerItem.defaultProps = {
  color: '#f4b504',
};

export { Container, SpinnerContainer, SpinnerWrpper, SpinnerItem };
