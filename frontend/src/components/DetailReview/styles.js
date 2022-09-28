import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media screen and (min-width: 767px) {
    width: 100%;
  }
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
  height: 100px;
  width: 100%;
  border: 1px solid lightgrey;
  > span {
    border-left: 1px solid lightgrey;
    color: orange;
    padding: 0px 0px 0px 15px;
  }
`;

const TotalRate = styled.div`
  padding: 0px 15px 0px 0px;
`;

const Comment = styled.div`
  color: black;
  font-size: 14px;
  padding: 5px;
  line-height: 20px;
  padding-bottom: 20px;
  border: 1px solid lightgrey;
  margin-top: -1px;
`;

const NameDateReply = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rate = styled.div`
  color: orange;
`;

const Date = styled.span`
  color: grey;
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

const OrderHistory = styled.div`
  font-size: 12px;
  color: grey;
`;

const Thumnail = styled.img`
  width: 200px;
  height: 120px;
`;

export {
  Section,
  Rating,
  TotalRate,
  Comment,
  NameDateReply,
  Date,
  Rate,
  ReplyDeleteBtn,
  ThumnailBox,
  OrderHistory,
  Thumnail,
};
