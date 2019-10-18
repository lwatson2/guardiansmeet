import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/LoginProfileRules";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";
import { device } from "../helpers/mediaQueries";

const MessagesPage = () => {
  const [user] = useContext(UserContext);
  const handleSendMessage = () => {};
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleSendMessage,
    validate
  );
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
          <MessageSubmitButton>Send</MessageSubmitButton>
        </InputContainer>
      </InputBottomOfPageContainer>
    </MessagesPageContainer>
  );
};

const MessagesPageContainer = styled.section`
  background: hsl(209, 16%, 82%);
  position: relative;
  height: 100vh;
  @media ${device.tablet} {
    height: calc(100vh - 55px);
    padding-top: 10px;
  }
`;
const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100% - 92px);
`;
const MessagesItemContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  max-width: 80%;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 5px;
  margin-left: ${props => props.leftMargin};
  flex-direction: ${props => props.direction};
  @media ${device.tablet} {
    max-width: 40%;
  }
`;
const UserProfilePicture = styled.img`
  height: 35px;
  align-self: baseline;
  border: 1px solid #7a0ecd;
  border-radius: 50%;
  margin: 0 5px;
  @media ${device.tablet} {
    height: 50px;
    margin: 0 15px;
  }
`;
const UserName = styled.h4``;
const MessageDetails = styled.p`
  padding: 10px;
  background: hsl(209, 20%, 25%);
  border-radius: 6px;
  color: hsl(216, 33%, 97%);
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.3);
`;
const InputBottomOfPageContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 2;
`;
const InputContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr auto;
`;
const MessageInput = styled.input`
  height: 60px;
  border-radius: 6px;
  border: none;
  margin-left: 10px;
  background: hsl(210, 13%, 43%);
  color: hsl(216, 33%, 97%);
  padding-left: 10px;
  box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
  @media ${device.tablet} {
    font-size: 20px;
  }
  ::-webkit-input-placeholder {
    color: hsl(216, 13%, 65%);
  }
  :-moz-placeholder {
    /* FF 4-18 */
    color: hsl(216, 13%, 65%);
    opacity: 1;
  }
  ::-moz-placeholder {
    /* FF 19+ */
    color: hsl(216, 13%, 65%);
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: hsl(216, 13%, 65%);
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: hsl(216, 13%, 65%);
  }
  ::placeholder {
    /* modern browser */
    color: hsl(216, 13%, 65%);
  }
`;
const MessageSubmitButton = styled.button`
  background: hsl(266, 55%, 47%);
  color: hsl(214, 33%, 97%);
  border: none;
  height: 30px;
  width: 50px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  font-size: 16px;
  margin: 0 10px;
  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  }
  @media ${device.tablet} {
    width: 100px;
  }
`;
export default MessagesPage;
