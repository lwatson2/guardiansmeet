import styled from "styled-components";

export const MessagePageContainer = styled.section`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
`;
export const EmptyMessagesPageContainer = styled.section`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MessageGroupItem = styled.div`
  width: 300px;
  height: 70px;
  background: hsl(211, 13%, 65%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.3);
  transition: all 0.2s ease;
  cursor: pointer;
  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
  :focus {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
`;
export const UserProfilePicture = styled.img`
  height: 50px;
  border-radius: 100%;
  margin-left: 15px;
`;
export const UserName = styled.h4`
  color: hsl(209, 20%, 25%);
  padding-left: 15px;
`;
export const EmptyMessagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: hsl(209, 24%, 16%);
  padding: 10px;
`;
export const EmptyMessageText = styled.h4`
  margin-top: 50px;
`;
export const EmptyMessageGraphic = styled.img`
  height: 200px;
`;
