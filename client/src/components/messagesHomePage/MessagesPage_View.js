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
  messagesList,
  errors,
  values,
  handleChange,
  handleSubmit
}) => {
  return (
    <MessagesPageContainer>
      <MessagesContainer>
        {messagesList &&
          messagesList.map(message => (
            <MessagesItemContainer
              leftMargin={user.id == message.sender.id ? "auto" : "0"}
              direction={user.id == message.sender.id ? "row-reverse" : "row"}
            >
              {user.id !== message.sender.id && (
                <UserProfilePicture
                  src={
                    message.sender.profilePicture
                      ? message.sender.profilePicture
                      : ProfilePicPlaceHolder
                  }
                />
              )}
              <MessageDetails>{message.messageDetails}</MessageDetails>
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
