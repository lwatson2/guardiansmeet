import React from "react";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";
import UndrawImage from "../../images/undraw_everywhere_together_bdmn.svg";
import {
  MessagePageContainer,
  EmptyMessagesPageContainer,
  MessageGroupItem,
  UserProfilePicture,
  UserName,
  EmptyMessagesContainer,
  EmptyMessageText,
  EmptyMessageGraphic
} from "./MessagesHomePage_Styles";
import { Link } from "react-router-dom";

const MessagesHomePage_View = ({ loading, userMessages }) => {
  if (loading) {
    return <div>Loading....</div>;
  }
  if (!loading && userMessages.length > 0) {
    return (
      <MessagePageContainer>
        {userMessages.map(message => (
          <Link key={message._id} to={`/messages/${message.username}`}>
            <MessageGroupItem>
              <UserProfilePicture
                src={
                  message.profilePicture
                    ? message.profilePicture
                    : ProfilePicPlaceHolder
                }
              />
              <UserName>{message.name}</UserName>
            </MessageGroupItem>
          </Link>
        ))}
      </MessagePageContainer>
    );
  }
  if (!loading && userMessages.length <= 0) {
    return (
      <EmptyMessagesPageContainer>
        <EmptyMessagesContainer>
          <EmptyMessageGraphic
            src={UndrawImage}
            alt="two people looking at each other from undraw"
          />
          <EmptyMessageText>
            Oops! Looks like you have no messages. Get out there guardian and
            find your match!
          </EmptyMessageText>
        </EmptyMessagesContainer>
      </EmptyMessagesPageContainer>
    );
  }
};

export default MessagesHomePage_View;
