import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  display: flex;
  ${({ scroll }) =>
    !scroll &&
    css`
      width: 100%;
      height: 100%;
    `}
  justify-content: center;
  align-items: center;
  min-height: 150px;
`;

const SpinnerContainer = styled.div`
  width: 150px;
  height: 150px;
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
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 15px solid ${({ color }) => color};
  border-width: ${({ size }) => parseInt(size / 6, 10)};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spinnerKeyframes} 1s linear infinite;
  top: 75px;
  left: 75px;
`;

SpinnerItem.defaultProps = {
  color: '#f4b504',
  size: 90,
};

export { Container, SpinnerContainer, SpinnerWrpper, SpinnerItem };
