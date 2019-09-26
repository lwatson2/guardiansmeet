import React from "react";
import styled from "styled-components";
import { device } from "../helpers/mediaQueries";

const UserListContainer = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserProfileContainer = styled.div`
  background: hsl(213, 16%, 82%);
  width: 280px;
  height: 280px;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 15px 30px hsla(0, 0%, 0%, 0.2);
  @media ${device.tablet} {
    width: 392px;
  }
`;
const UserImageContainer = styled.div`
  height: 100px;
  position: absolute;
  bottom: 231px;
  border-radius: 100%;
  border: 2px solid hsl(262, 100%, 78%);
  background-color: hsl(0, 0%, 91%);
`;
const UserImage = styled.img`
  height: 100px;
  width: 100px;
`;
const UserDetails = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  width: 100%;
  align-items: center;
  justify-items: center;
  margin-top: 52px;
  color: hsl(210, 24%, 16%);
`;
const UserNameContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  padding: 10px;
`;
const UserName = styled.p`
  grid-row: 1;
  font-size: 20px;
`;
const UserUsername = styled.p`
  align-self: center;
  justify-self: center;
`;
const UserBio = styled.p`
  padding: 10px;
  font-size: 14px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const ConnectBtnContainer = styled.div`
  justify-self: end;
  padding-right: 10px;
`;
const ConnectBtn = styled.button`
  width: 100px;
  background: hsl(274, 87%, 37%);
  border: none;
  height: 30px;
  border-radius: 6px;
  font-size: 16px;
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    box-shadow: none;
    transform: translateY(-2px);
    background: hsl(273, 80%, 47%);
  }
`;
const Home = () => {
  let user = sessionStorage.getItem("userData");
  user = JSON.parse(user);
  return (
    <UserListContainer>
      <UserProfileContainer>
        <UserImageContainer>
          <UserImage src={user.profilePicture}></UserImage>
        </UserImageContainer>
        <UserDetails>
          <UserNameContainer>
            <UserName>
              {user.name}, {user.age}
            </UserName>
            <UserUsername>@{user.username}</UserUsername>
          </UserNameContainer>
          <UserBio>{user.bio}</UserBio>
          <ConnectBtnContainer>
            <ConnectBtn>Chat</ConnectBtn>
          </ConnectBtnContainer>
        </UserDetails>
      </UserProfileContainer>
    </UserListContainer>
  );
};

export default Home;
