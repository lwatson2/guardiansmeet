import React from "react";
import {
  UserListContainer,
  ProfileCardContainer,
  LoadingContainer
} from "./Home_Styles";
import ProfileCard from "../profileCard/ProfileCard";

const Home_View = ({
  userCount,
  userList,
  user,
  onScreen,
  ref,
  handleChat
}) => {
  return (
    <UserListContainer>
      {userList.map(userItem => (
        <ProfileCardContainer key={userItem._id}>
          <ProfileCard
            handleChat={handleChat}
            user={userItem}
            showChatBtn={true}
            loggedInUser={user}
          />
        </ProfileCardContainer>
      ))}
      <LoadingContainer
        opactiy={userList.length >= userCount && onScreen ? "0" : "1"}
        ref={ref}
      >
        Loading
      </LoadingContainer>
    </UserListContainer>
  );
};
export default Home_View;
