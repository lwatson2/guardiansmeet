import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { NewMessageContext } from "../context/NewMessageContext";
import NotificationMessage from "../notification/NotificationMessage_View";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import Notification from "../notification/Notification";

const NotificationContainer = props => {
  const [requestedUser, setrequestedUser] = useState({});
  const [userNotificationId, setUserNotificationId] = useState();
  const [currentUserUsername, setCurrentUserUsername] = useState();
  const [user] = useContext(UserContext);
  const [newMessage, setNewMessage] = useContext(NewMessageContext);
  const [showUser, setShowUser] = useState(false);
  const { socket } = props;
  const token = Cookies.get("token");

  let config = {
    headers: { Authorization: "Bearer " + token }
  };

  useEffect(() => {
    socket.on("connect", () => console.log("connected"));
  }, []);
  const showToast = (username, id) => {
    toast(
      <NotificationMessage
        id={id}
        user={username}
        setShowUser={setShowUser}
        setUserNotificationId={setUserNotificationId}
      />,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      }
    );
  };
  useEffect(() => {
    if (user.matched) {
      user.matched.forEach(match => {
        if (match.viewed === false) {
          showToast(match.username, match.id);
          axios.post("/users/setViewedMatched", { user, id: match.id }, config);
        }
      });
    }
    let groupIdsSet = new Set();
    if (user.messages) {
      user.messages.forEach(message => {
        message.messagesList.map(messageItem => {
          if (messageItem.viewed === false) {
            groupIdsSet.add(message._id);
          }
        });
      });
    }
    const convertedGroupIdsArray = Array.from(groupIdsSet);
    if (convertedGroupIdsArray.length > 0) {
      setNewMessage({
        groupId: convertedGroupIdsArray,
        viewed: false
      });
    }
    socket.on("recievedChatRequest", data => {
      setrequestedUser(data.requestedUser);
      setCurrentUserUsername(data.currentUser);
    });
  }, [user]);

  useEffect(() => {
    if (user.username && currentUserUsername === user.username) {
      axios.post(
        "/users/setViewedMatched",
        { user, id: requestedUser.id },
        config
      );
      showToast(requestedUser.name, requestedUser.id);
    }
  }, [currentUserUsername]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await axios.get(
        `/users/fetchMatchedUserDetails?username=${userNotificationId}`,
        config
      );
      setrequestedUser(res.data.user);
    };
    if (userNotificationId) {
      fetchUserProfile();
      setShowUser(true);
    }
  }, [userNotificationId]);
  return (
    <>
      {" "}
      {props.children}{" "}
      {showUser && (
        <Notification setShowUser={setShowUser} requestedUser={requestedUser} />
      )}
    </>
  );
};

export default NotificationContainer;
