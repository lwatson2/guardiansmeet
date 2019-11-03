import React, { useState, createContext } from "react";

export const NewMessageContext = createContext();

export const NewMessageProvider = props => {
  const [newMessage, setNewMessage] = useState({ viewed: true, groupId: [] });
  return (
    <NewMessageContext.Provider value={[newMessage, setNewMessage]}>
      {props.children}
    </NewMessageContext.Provider>
  );
};
