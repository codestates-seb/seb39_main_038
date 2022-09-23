import styled from 'styled-components';

const Section = styled.div`
  margin: 0 auto;
  max-width: 1020;
  > button {
    position: fixed;
    bottom: 0px;
  }
`;

const Title = styled.h1`
  font-size: 16px;
`;

const CreateFoodTruck = styled.div`
  padding: 10px;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
  > div {
    display: flex;
    justify-content: center;
    > button {
      justify-content: end;
    }
  }
`;

const TypeInfo = styled.div`
  > input {
    border: 1px solid lightgrey;
    margin-top: -1px;
    width: 100%;
  }
`;

const Hashtag = styled.button`
  background-color: white;
`;

const DeleteTag = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
`;

const AddFood = styled.div`
  padding: 10px;
  border: 1px solid lightgrey;
  margin-bottom: 40px;
`;

const CreateFood = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
`;

const UpdateFood = styled.div`
  border: 1px solid lightgrey;
`;

const UpdateInput = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  Section,
  Title,
  CreateFoodTruck,
  TypeInfo,
  Hashtag,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
};
