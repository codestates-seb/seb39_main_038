import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 104px;
  padding: 10px 10px 10px;
  border-bottom: 1px solid grey;
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MenuImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  > img {
    width: 80px;
    height: 80px;
  }
`;

export { Section, Menu, MenuInfo, MenuImg };
