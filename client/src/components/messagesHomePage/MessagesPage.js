import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/MessagesRules";
import MessagesPage_View from "./MessagesPage_View";

const MessagesPage = ({ socket }) => {
  const [user] = useContext(UserContext);
  const [messages, setMessages] = useState();
  useEffect(() => {
    socket.on("message", data => {
      updateMessages(data);
    });
  }, []);
  const handleSendMessage = () => {
    socket.emit("sendMessage", { values, user });
  };
  const updateMessages = data => {
    setMessages(prevState => [...prevState, { data }]);
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
