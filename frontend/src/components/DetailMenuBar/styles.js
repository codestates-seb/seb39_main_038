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
  background-color: lightgrey;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(e) => e.theme.mainColor};
  height: 104px;
  padding: 10px 10px 10px;
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

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: ${(e) => e.theme.mainColor};
  height: 100px;
  width: 100%;
`;

const Comment = styled.div`
  color: black;
  background-color: lightgrey;
  font-size: 14px;
  padding: 5px;
`;

const NameDateReply = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReplyDeleteBtn = styled.button`
  background-color: lightgrey;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
  border: 0px;
`;

const ThumnailBox = styled.button`
  flex-direction: row;
`;

const Thumnail = styled.img`
  width: 200px;
  height: 120px;
`;
export {
  MenuBar,
  TabBtn,
  Section,
  Menu,
  MenuInfo,
  MenuImg,
  Rating,
  Comment,
  NameDateReply,
  ReplyDeleteBtn,
  ThumnailBox,
  Thumnail,
};
