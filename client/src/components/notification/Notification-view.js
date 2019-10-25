import React from "react";
import {
  UserProfileContainer,
  UserCardContainer,
  ChatRequestBtnContainer,
  UserChatRequestBtn
} from "./NotificationStyles";
import ProfileCard from "../profileCard/ProfileCard";

const Notification_View = ({
  requestedUser,
  handleAccepted,
  handleDeclined
}) => {
  console.log(requestedUser);
  if (requestedUser.name) {
    return (
      <UserProfileContainer>
        <UserCardContainer>
          <ProfileCard user={requestedUser} showChatBtn={false} />
          <ChatRequestBtnContainer>
            <UserChatRequestBtn
              color="hsl(102, 97%, 16%)"
              background="hsl(101, 100%, 80%)"
              onClick={handleAccepted}
            >
              Accept
            </UserChatRequestBtn>
            <UserChatRequestBtn
              color="hsl(0, 85%, 27%)"
              background="hsl(0, 100%, 80%)"
              onClick={handleDeclined}
            >
              Decline
            </UserChatRequestBtn>
          </ChatRequestBtnContainer>
        </UserCardContainer>
      </UserProfileContainer>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Notification_View;
