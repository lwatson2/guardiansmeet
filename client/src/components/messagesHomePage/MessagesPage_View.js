import React from "react";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";
import {
  MessagesPageContainer,
  MessagesContainer,
  MessagesItemContainer,
  UserProfilePicture,
  UserName,
  MessageDetails,
  InputBottomOfPageContainer,
  InputContainer,
  MessageInput,
  MessageSubmitButton
} from "./MessagesPage_Styles";

const MessagesPage_View = ({
  user,
  messages,
  errors,
  values,
  handleChange,
  handleSubmit
}) => {
  return (
    <MessagesPageContainer>
      <MessagesContainer>
        {messages.length > 0 &&
          messages.map(message => (
            <MessagesItemContainer
              leftMargin={user.username == message.user.username ? "auto" : "0"}
              direction={
                user.username == message.user.username ? "row-reverse" : "row"
              }
            >
              {user.username !== message.user.username && (
                <UserProfilePicture
                  src={
                    message.user.profilePicture
                      ? message.user.profilePicture
                      : ProfilePicPlaceHolder
                  }
                />
              )}
              <MessageDetails>{message.message}</MessageDetails>
            </MessagesItemContainer>
          ))}{" "}
      </MessagesContainer>
      <InputBottomOfPageContainer>
        <InputContainer>
          <MessageInput
            borderColor={errors.message ? "1px solid hsl(0, 75%, 45%)" : "none"}
            type="text"
            value={values.message || ""}
            onChange={handleChange}
            id="message"
            name="message"
            placeholder="Send message..."
          />
          <MessageSubmitButton
            onClick={handleSubmit}
            disabled={values.message ? false : true}
          >
            Send
          </MessageSubmitButton>
        </InputContainer>
      </InputBottomOfPageContainer>
    </MessagesPageContainer>
  );
};

export default MessagesPage_View;
