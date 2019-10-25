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
        <MessagesItemContainer leftMargin="0" direction="row">
          <UserProfilePicture
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          />
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="auto" direction="row-reverse">
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="0" direction="row">
          <UserProfilePicture
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          />
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="0" direction="row">
          <UserProfilePicture
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          />
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="auto" direction="row-reverse">
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="0" direction="row">
          <UserProfilePicture
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          />
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
        <MessagesItemContainer leftMargin="0" direction="row">
          <UserProfilePicture
            src={
              user.profilePicture ? user.profilePicture : ProfilePicPlaceHolder
            }
          />
          <MessageDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            dignissimos. Deserunt non quod eaque, quaerat consectetur maiores,
            error culpa reiciendis tempora ad nam? Ipsam, vitae. Quam
            consectetur ut quisquam dolor?
          </MessageDetails>
        </MessagesItemContainer>
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
