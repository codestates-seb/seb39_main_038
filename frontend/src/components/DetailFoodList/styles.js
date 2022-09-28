import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media screen and (min-width: 767px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 104px;
  padding: 10px 10px 10px;
  border: 1px solid lightgrey;
  margin-top: -1px;
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const Info = styled.span`
  font-size: 12.5px;
  color: grey;
`;

const Price = styled.span`
  font-size: 15px;
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

export { Section, Menu, MenuInfo, Name, Info, Price, MenuImg };
