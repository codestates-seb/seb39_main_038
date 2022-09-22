import styled from 'styled-components';

const MenuBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const TabBtn = styled.button`
  width: 33.3%;
  height: 47px;
  background-color: ${(e) => e.theme.mainColor};
  color: ${(e) => e.theme.fontColor};
  font-size: 20px;
  font-weight: 900;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

export { MenuBar, TabBtn, Section };
