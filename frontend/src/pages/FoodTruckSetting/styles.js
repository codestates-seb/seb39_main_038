import styled from 'styled-components';
import { COLOR } from '../../constants';

const Section = styled.div`
  margin: 0 auto;
  max-width: 1020px;
  padding: 10px 80px 40px;
  button {
    padding: 5px 15px;
    background-color: white;
    font-weight: 900;
  }
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
    width: 50%;
    justify-content: end;
    display: flex;
    img {
      width: 150px;
      height: 150px;
    }
  }
`;

const Avatar = styled.div`
  div {
    gap: 5px;
    width: 100px;
    flex-direction: column;
    display: flex;
    align-items: center;
    input {
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      border: 0;
    }
    label {
      display: inline-block;
      padding: 0.5em 2em;
      border-radius: 2em;
      box-sizing: border-box;
      text-decoration: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      color: ${COLOR.YELLOW};
      background-color: ${COLOR.NAVY};
      text-align: center;
      transition: all 0.2s;
      font-weight: 600;
      font-size: 14px;
      :hover {
        background-color: ${COLOR.LIGHTNAVY};
      }
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
    resize: none;
  }
`;

const TypeInfo = styled.form`
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
  font-size: 14px;
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
    width: 100px;
    height: 90px;
  }
  button {
    padding: 10px 30px;
    background-color: white;
  }
`;

const UpdateFood = styled.div`
  border-top: 1px solid #ccc;
`;

const UpdateInput = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
  gap: 7px;
  align-items: center;
  img {
    border: 1px solid #ccc;
    object-fit: contain;
    width: 100px;
    height: 90px;
  }
  button {
    padding: 5px 10px;
    background-color: white;
  }
`;

const SettingDoneBtn = styled.div`
  padding: 50px 60px 50px 0px;
  display: flex;
  justify-content: end;
  gap: 50px;
  > button {
    padding: 10px 30px 10px 30px;
    background-color: white;
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
  Avatar,
};
