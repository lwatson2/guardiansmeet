import styled from "styled-components";

export const ToastMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ToastMessage = styled.span`
  margin-bottom: 5px;
`;
export const ToastProfileButton = styled.button`
  background: hsl(209, 20%, 25%);
  color: hsl(216, 33%, 97%);
  border: none;
  outline: none;
  height: 30px;
  width: 100px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  align-self: end;
  margin-left: auto;
`;

export const UserProfileContainer = styled.div`
  background: hsla(0, 0%, 0%, 0.4);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UserCardContainer = styled.div``;
export const ChatRequestBtnContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
`;
export const UserChatRequestBtn = styled.button`
  border: none;
  background: ${props => props.background};
  color: ${props => props.color};
  height: 30px;
  width: 100px;
  border-radius: 6px;
  cursor: pointer;
`;
