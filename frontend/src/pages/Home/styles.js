import styled from 'styled-components';
import { SCREEN } from '../../constants/index';

const HomeContainer = styled.div``;

const Banner = styled.div`
  height: ${({ primary }) => (primary ? '235px' : '100px')};
  background-image: url('https://bamdokkaebi.org/plugins/bamdokkebi/theme/assets/img/sub_cm/body_image.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media all and (max-width: ${SCREEN.MOBILE}) {
    display: none;
  }
`;

const HomeWrapper = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  padding-top: 10px;
`;

export { HomeContainer, Banner, HomeWrapper };
