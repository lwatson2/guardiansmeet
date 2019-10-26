import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/MessagesRules";
import MessagesPage_View from "./MessagesPage_View";

const MessagesPage = ({ socket }) => {
  const [user] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  useEffect(() => {
    socket.on("message", data => {
      setNewMessage(data);
    });
  }, []);
  const handleSendMessage = () => {
    if (user.username) {
      socket.emit("sendMessage", { message: values.message, user });
      values.message = "";
    }
  };
  useEffect(() => {
    if (newMessage.message) {
      if (messages.length <= 0) {
        setMessages([newMessage]);
      } else {
        setMessages(message => [...message, newMessage]);
      }
    }
  }, [newMessage]);
  const updateMessages = data => {
    console.log(messages.length);
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleSendMessage,
    validate
  );
  return (
    <MessagesPage_View
      user={user}
      errors={errors}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      messages={messages}
    />
  );
};

export default MessagesPage;
