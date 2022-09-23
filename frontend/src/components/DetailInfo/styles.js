import styled from 'styled-components';

const TruckInfoBody = styled.div`
  margin: 20px;
  line-height: 30px;
`;

const TruckInfoTitle = styled.div`
  font-size: 25px;
  font-weight: 900;
  color: black;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
`;

const TruckInfoContent = styled.div`
  white-space: pre-wrap;
  color: black;
  padding-bottom: 50px;
  padding-top: 10px;
`;

const TruckInfoContentKey = styled.div`
  color: grey;
  padding-bottom: 15px;
`;

const TruckInfoContentValue = styled.span`
  color: black;
`;

export {
  TruckInfoBody,
  TruckInfoTitle,
  TruckInfoContent,
  TruckInfoContentKey,
  TruckInfoContentValue,
};
