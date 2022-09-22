import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
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
  line-height: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
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
  Section,
  Rating,
  Comment,
  NameDateReply,
  ReplyDeleteBtn,
  ThumnailBox,
  Thumnail,
};
