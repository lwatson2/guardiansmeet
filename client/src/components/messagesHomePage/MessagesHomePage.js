import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NewMessageContext } from "../context/NewMessageContext";

import axios from "axios";
import Cookies from "js-cookie";
import MessageHomePage_View from "./MessagesHomePage_View";

const MessagesHomePage = () => {
  const token = Cookies.get("token");
  const [user] = useContext(UserContext);
  const [userMessages, setUserMessages] = useState();
  const [loading, setLoading] = useState(true);
  const [newMessage] = useContext(NewMessageContext);

  let config = {
    headers: { Authorization: "Bearer " + token }
  };

  useEffect(() => {
    const fetchUserMessages = async () => {
      //Gets users most recent messages and most recent profile picture
      if (user && user.id) {
        setLoading(true);
        const res = await axios.get(
          `/users/getUserMessages?id=${user.id}`,
          config
        );
        await Promise.all(
          res.data.messages.map(async message => {
            let response = await axios.get(
              `/users/getUserProfilePicture?id=${message.id}`
            );

            return (message.profilePic = response.data.profilePic);
          })
        );
        setUserMessages(res.data.messages);
        setLoading(false);
      }
    };
    fetchUserMessages();
  }, [user]);
  return (
    <MessageHomePage_View
      newMessage={newMessage}
      loading={loading}
      userMessages={userMessages}
    />
  );
};

export default MessagesHomePage;
