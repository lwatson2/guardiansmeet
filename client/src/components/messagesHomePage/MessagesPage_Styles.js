import styled from "styled-components";
import { device } from "../helpers/mediaQueries";

export const MessagesPageContainer = styled.section`
  background: hsl(209, 16%, 82%);
  position: relative;
  height: calc(100vh - 45px);
  @media ${device.tablet} {
    height: calc(100vh - 55px);
    padding-top: 10px;
  }
`;
export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100% - 92px);
`;
export const MessagesItemContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  max-width: 80%;
  align-items: center;
  padding: 5px;
  margin-right: 5px;
  margin-left: ${props => props.leftMargin};
  flex-direction: ${props => props.direction};
  @media ${device.tablet} {
    max-width: 40%;
  }
`;
export const UserProfilePicture = styled.img`
  height: 35px;
  width: 35px;
  align-self: baseline;
  border: 1px solid #7a0ecd;
  border-radius: 50%;
  margin: 0 5px;
  @media ${device.tablet} {
    height: 50px;
    width: 50px;
    margin: 0 15px;
  }
`;
export const UserName = styled.h4``;
export const MessageDetails = styled.p`
  padding: 10px;
  background: hsl(209, 20%, 25%);
  border-radius: 6px;
  color: hsl(216, 33%, 97%);
  word-break: break-word;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.3);
`;
export const MessageDetailsContinaer = styled.div``;
export const MessageTimeStamp = styled.p`
  color: hsla(210, 24%, 16%, 0.8);
  padding-top: 5px;
  font-size: 12px;
`;
export const InputBottomOfPageContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 2;
`;
export const InputContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr auto;
`;
export const MessageInput = styled.input`
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
export const MessageSubmitButton = styled.button`
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
