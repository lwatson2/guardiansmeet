import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/MessagesRules";
import MessagesPage_View from "./MessagesPage_View";

const MessagesPage = props => {
  const [user] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [stuff, setStuff] = useState();
  const { socket } = props;
  useEffect(() => {
    console.log(user);
    socket.on("message", data => {
      setNewMessage(data);
    });
  }, []);
  useEffect(() => {
    let message = [];
    if (user.messages) {
      message = user.messages.filter(
        message => message.id === props.match.params.id
      );
    }
    console.log(message);
    setMessage(message[0]);
    //message = message[0];
  }, [user]);
  const handleSendMessage = () => {
    if (user.username) {
      socket.emit("sendMessage", {
        message: values.message,
        user,
        connectedUser: stuff
      });
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
