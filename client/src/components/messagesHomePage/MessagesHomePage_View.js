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
  EmptyMessageGraphic,
  UnreadMessageNotificationIcon
} from "./MessagesHomePage_Styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading } from "../loadingComponent/Loading";

const MessagesHomePage_View = ({ loading, userMessages, newMessage }) => {
  if (loading) {
    return <Loading />;
  }
  if (!loading && userMessages.length > 0) {
    return (
      <MessagePageContainer>
        {userMessages.map(message => (
          <Link key={message._id} to={`/messages/${message._id}`}>
            <MessageGroupItem position="relative">
              <UserProfilePicture
                src={
                  message.profilePic
                    ? message.profilePic
                    : ProfilePicPlaceHolder
                }
              />
              <UserName>{message.name}</UserName>
              {newMessage.groupId.includes(message._id) && (
                <UnreadMessageNotificationIcon>
                  <FontAwesomeIcon icon="exclamation" size="sm" />
                </UnreadMessageNotificationIcon>
              )}
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
