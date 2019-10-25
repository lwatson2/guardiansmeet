import React, { useEffect, useContext, useState } from "react";
import {
  ToastMessageContainer,
  ToastMessage,
  ToastProfileButton
} from "./NotificationStyles";

const NotificationMessage = ({ user, id, setUserNotificationId }) => {
  const handleClick = () => {
    setUserNotificationId(id);
  };
  return (
    <ToastMessageContainer>
      <ToastMessage> {user} wants to chat</ToastMessage>
      <ToastProfileButton onClick={handleClick}>
        View Profile
      </ToastProfileButton>
    </ToastMessageContainer>
  );
};
export default NotificationMessage;
