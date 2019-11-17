import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/MessagesRules";
import MessagesPage_View from "./MessagesPage_View";
import axios from "axios";
import { NewMessageContext } from "../context/NewMessageContext";

const MessagesPage = props => {
  const [user] = useContext(UserContext);
  const [messagesList, setMessagesList] = useState([]);
  const [newMessageItem, setNewMessageItem] = useState({});
  const [messageGroupDetails, setMessageGroupDetails] = useState({});
  const [socketRoom, setsocketRoom] = useState();
  const { socket } = props;
  const [newMessage, setNewMessage] = useContext(NewMessageContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewMessage({ viewed: true, groupId: [] });
    socket.on("newMessage", data => {
      setNewMessageItem(data);
    });
    socket.on("joinedroom", data => {
      setsocketRoom(data);
    });
  }, []);
  useEffect(() => {
    let message = [];
    let messageGroupDetailsArray = [];
    setLoading(true);
    const fetchMessages = async () => {
      const res = await axios.get(`/users/getUserMessages?id=${user.id}`);
      message = res.data.messages;
      if (message.length > 0) {
        messageGroupDetailsArray = message.filter(
          message => message._id === props.match.params.id
        )[0];
      }
      if (!messageGroupDetailsArray && user.id) {
        return props.history.push("/messages");
      }
      if (messageGroupDetailsArray.profilePicture) {
        console.log(messageGroupDetailsArray.id);
        let response = await axios.get(
          `users/getUserProfilePicture?id=${messageGroupDetailsArray.id}`
        );
      }
      setMessageGroupDetails(messageGroupDetailsArray);
    };
    if (user.id) {
      fetchMessages();
    }
  }, [user]);
  useEffect(() => {
    if (messageGroupDetails) {
      socket.emit("joinroom", {
        userId: user.id,
        connectedUserId: messageGroupDetails.id
      });
      if (messageGroupDetails._id && messageGroupDetails.messagesList > 0)
        axios.post("/users/updateReadMessages", {
          groupId: messageGroupDetails._id,
          userId: user.id
        });
    }
    if (messageGroupDetails && messageGroupDetails.messagesList) {
      setMessagesList(messageGroupDetails.messagesList);
      setLoading(false);
    }
    return () => {};
  }, [messageGroupDetails]);
  const handleSendMessage = () => {
    let timestamp = new Date().toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
      month: "2-digit",
      day: "2-digit"
    });
    if (user.username) {
      socket.emit("sendMessage", {
        messageDetails: values.message,
        sender: { id: user.id, profilePicture: user.profilePicture },
        room: socketRoom,
        timestamp
      });
      axios.post(`/users/updateChat/${user.id}`, {
        messageDetails: values.message,
        sender: { id: user.id, profilePicture: user.profilePicture },
        secondUserId: props.match.params.id,
        timestamp,
        groupId: messageGroupDetails._id
      });
      values.message = "";
    }
  };
  useEffect(() => {
    if (newMessageItem.messageDetails) {
      if (messagesList.length <= 0) {
        setMessagesList([newMessageItem]);
      } else {
        setMessagesList(message => [...message, newMessageItem]);
      }
    }
  }, [newMessageItem]);
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleSendMessage,
    validate
  );
  return (
    <MessagesPage_View
      user={user}
      errors={errors}
      values={values}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      messagesList={messagesList}
      messageGroupDetails={messageGroupDetails}
    />
  );
};

export default MessagesPage;
