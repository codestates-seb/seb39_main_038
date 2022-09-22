import styled from 'styled-components';

const MenuBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const MenuTabBtn = styled.button`
  width: 33.3%;
  height: 47px;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '메뉴' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === '메뉴' ? '#16267D' : 'black')};
`;

const ReviewTabBtn = styled.button`
  width: 33.3%;
  height: 47px;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '리뷰' ? '#16267D' : 'asd')};
  color: ${(props) => (props.menu === '리뷰' ? '#16267D' : 'black')};
`;

const InfoTabBtn = styled.button`
  width: 33.3%;
  height: 47px;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '정보' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === '정보' ? '#16267D' : 'black')};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

export { MenuBar, ReviewTabBtn, InfoTabBtn, MenuTabBtn, Section };
