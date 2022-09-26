import styled from 'styled-components';

const Section = styled.div`
  margin: 0 auto;
  max-width: 1020px;
  padding: 10px 20px 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  padding: 30px 10px 30px 10px;
`;

const MainImg = styled.div`
  font-size: 14px;
  gap: 20px;
  align-items: center;
  padding: 0px 0px 20px 0px;
  > img {
    line-height: 100px;
    background-image: url(${(props) => props.url});
    border: 1px solid #ccc;
  }
  > button {
    padding: 2px 10px;
    height: 50%;
    background-color: white;
  }
`;

const CreateFoodTruck = styled.div`
  padding-bottom: 100px;
  border-bottom: 3px solid ${(props) => props.theme.mainColor};
  > div {
    display: flex;
    justify-content: center;
  }
  > form {
    display: flex;
    justify-content: start;
  }
  > textarea {
    padding: 10px;
    height: 200px;
    border: 1px solid #ccc;
    width: 100%;
  }
`;

const TypeInfo = styled.div`
  > input {
    border: 1px solid lightgrey;
    margin-top: -1px;
    width: 100%;
    padding: 10px;
  }
`;

const DeleteTag = styled.div`
  padding: 30px 0px 30px 0px;
  flex-wrap: wrap;
`;

const Form = styled.form`
  height: 25px;
  /* width: 220px; */
  overflow: hidden;
  input {
    width: 100px;
    clear: left;
    float: left;
    padding: 1px 10px;
    display: hidden;
  }
  label:focus + input {
    transition: 0.5s;
    margin-left: -50%;
  }
  input:focus {
    margin-right: -50%;
    transition: 0.5s;
  }
`;

const HashTagBtn = styled.label`
  padding: 2px 10px;
  float: left;
  border-radius: 5px;
  text-align: center;
  background: white;
  border: 1px solid #ccc;
  transition: 0.5s;
  overflow: hidden;
`;

const Hash = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  > button {
    font-size: 8px;
    padding: 0px 4px 0px 4px;
    background-color: white;
  }
  > span {
    padding: 0px 5px 0px 10px;
  }
`;

const AddFood = styled.div`
  padding-top: 70px;
`;

const CreateFood = styled.div`
  display: flex;
  padding: 0px 0px 30px 0px;
  gap: 10px;
  align-items: center;
  > img {
    border: 1px solid #ccc;
    padding: 20px;
  }
  > button {
    padding: 5px;
    background-color: white;
  }
`;

const UpdateFood = styled.div`
  border-top: 1px solid #ccc;
`;

const UpdateInput = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
  gap: 10px;
  align-items: center;
  > img {
    border: 1px solid #ccc;
    padding: 20px;
  }
  > button {
    padding: 5px;
    background-color: white;
  }
`;

const SettingDoneBtn = styled.div`
  padding: 50px 50px 50px 0px;
  > button {
    float: right;
    padding: 10px 40px 10px 40px;
    background-color: white;
  }
  @media screen and (max-width: 767px) {
    > button {
      position: fixed;
      bottom: 0px;
      width: calc(100% - 40px);
    }
  }
`;

export {
  Section,
  Title,
  MainImg,
  CreateFoodTruck,
  TypeInfo,
  Form,
  HashTagBtn,
  Hash,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
  SettingDoneBtn,
};
