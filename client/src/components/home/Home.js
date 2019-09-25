import React from "react";
import styled from "styled-components";
const UserListContainer = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserProfileContainer = styled.div`
  background: hsl(210, 13%, 65%);
  width: 250px;
  height: 250px;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;
const UserImageContainer = styled.div`
  height: 100px;
  position: absolute;
  bottom: 214px;
  border-radius: 100%;
  border: 2px solid;
  background-color: hsl(0, 0, 91%);
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
  margin-top: 25px;
`;
const UserNameContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
`;
const UserName = styled.span`
  grid-row: 1;
`;
const UserAge = styled.span`
  grid-row: 1;
`;
const UserUsername = styled.span`
  align-self: center;
  justify-self: center;
`;
const UserBio = styled.p``;
const ConnectBtnContainer = styled.div`
  justify-self: end;

  padding-right: 10px;
`;
const ConnectBtn = styled.button``;
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
            <UserName>{user.name},</UserName>
            <UserAge>{user.age}</UserAge>
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
