import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";

const MessagesHomePage = () => {
  const [user] = useContext(UserContext);
  //Wrap Message Group Item in link component
  return (
    <MessagePageContainer>
      <MessageGroupItem>
        <UserProfilePicture
          src={
            user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
          }
        />
        <UserName>{user.name}</UserName>
      </MessageGroupItem>
      <MessageGroupItem>
        <UserProfilePicture
          src={
            user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
          }
        />
        <UserName>{user.name}</UserName>
      </MessageGroupItem>
      <MessageGroupItem>
        <UserProfilePicture
          src={
            user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
          }
        />
        <UserName>{user.name}</UserName>
      </MessageGroupItem>
      <MessageGroupItem>
        <UserProfilePicture
          src={
            user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
          }
        />
        <UserName>{user.name}</UserName>
      </MessageGroupItem>
    </MessagePageContainer>
  );
};

const MessagePageContainer = styled.section`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
`;
const MessageGroupItem = styled.div`
  width: 300px;
  height: 70px;
  background: hsl(211, 13%, 65%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.3);
  transition: all 0.2s ease;
  cursor: pointer;
  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
  :focus {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
`;
const UserProfilePicture = styled.img`
  height: 50px;
  border-radius: 100%;
  margin-left: 15px;
`;
const UserName = styled.h4`
  color: hsl(209, 20%, 25%);
  padding-left: 15px;
`;
export default MessagesHomePage;
