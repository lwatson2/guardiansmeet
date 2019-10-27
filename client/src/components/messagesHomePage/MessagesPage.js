import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/MessagesRules";
import MessagesPage_View from "./MessagesPage_View";

const MessagesPage = props => {
  const [user] = useContext(UserContext);
  const [messagesList, setMessagesList] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [messageGroupDetails, setMessageGroupDetails] = useState({});
  const [socketRoom, setsocketRoom] = useState();
  const { socket } = props;
  useEffect(() => {
    socket.on("newMessage", data => {
      console.log(data);
      setNewMessage(data);
    });
    socket.on("joinedroom", data => {
      setsocketRoom(data);
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
    setMessageGroupDetails(message[0]);
  }, [user]);
  useEffect(() => {
    if (messageGroupDetails) {
      socket.emit("joinroom", {
        userId: user.id,
        connectedUserId: messageGroupDetails.id
      });
    }
    if (messageGroupDetails && messageGroupDetails.messages) {
      setMessagesList(messageGroupDetails.messages);
    }
    return () => {};
  }, [messageGroupDetails]);
  const handleSendMessage = () => {
    if (user.username) {
      socket.emit("sendMessage", {
        messageDetails: values.message,
        sender: { id: user.id, profilePicture: user.profilePicture },
        room: socketRoom
      });
      values.message = "";
    }
  };
  useEffect(() => {
    if (newMessage.messageDetails) {
      if (messagesList.length <= 0) {
        console.log(newMessage);
        setMessagesList([newMessage]);
      } else {
        setMessagesList(message => [...message, newMessage]);
      }
    }
  }, [newMessage]);
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
      messagesList={messagesList}
    />
  );
};

export default MessagesPage;
