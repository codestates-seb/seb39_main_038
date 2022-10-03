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
  align-items: start;
  padding: 0px 0px 20px 0px;
  display: flex;
  div {
    background-image: url(${(props) => props.url});
    width: 50%;
    justify-content: end;
    display: flex;
    img {
      border: 1px solid #ccc;
      line-height: 110px;
    }
  }
`;

const Dropdown = styled.div`
  float: right;
`;

const CreateFoodTruck = styled.div`
  padding-bottom: 100px;
  border-bottom: #16267d;
  > div {
    display: flex;
    justify-content: center;
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

const HashTagBtn = styled.button`
  padding: 2px 10px;
  border-radius: 5px;
  text-align: center;
  background: white;
  border: 1px solid #ccc;
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
  input {
    width: 60px;
    border: none;
    cursor: pointer;

    :focus {
      border: 1px solid #ccc;
    }
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
  img {
    border: 1px solid #ccc;
    object-fit: contain;
    width: 120px;
    height: 120px;
  }
  button {
    padding: 5px 15px;
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
  img {
    border: 1px solid #ccc;
    object-fit: contain;
    width: 120px;
    height: 120px;
  }
  button {
    padding: 5px 15px;
    background-color: white;
  }
`;

const SettingDoneBtn = styled.div`
  padding: 50px 60px 50px 0px;
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

const Toggle = styled.div`
  display: inline-block;
  input {
    :checked ~ label {
      background: #f03d3d;
    }
    :checked ~ label > span {
      left: calc(100% - 2.8rem);
      background: #fff;
    }
  }
  label {
    width: 6rem;
    margin: 2rem;
    height: 3rem;
    display: block;
    position: relative;
    border-radius: 2rem;
    background-color: #fff;
    box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);
    transition: all 0.2s ease-in;
    cursor: pointer;
    span {
      width: 2.6rem;
      height: 2.6rem;
      position: absolute;
      top: 50%;
      left: 0.2rem;
      transform: translateY(-50%);
      border-radius: 50%;
      background: #f03d3d;
    }
  }
`;

const OpenOrClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 36px;
    color: grey;
    padding: 0px 0px 0px 20px;
  }
`;

export {
  Section,
  Title,
  MainImg,
  Dropdown,
  CreateFoodTruck,
  TypeInfo,
  HashTagBtn,
  Hash,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
  SettingDoneBtn,
  Toggle,
  OpenOrClose,
};
