import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Notifcation_View from "./Notification-view";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

const Notification = (props, { requestedUser }) => {
  const [user] = useContext(UserContext);
  const token = Cookies.get("token");
  const [state, setState] = useState("initialState");
  let config = {
    headers: { Authorization: "Bearer " + token }
  };

  const handleAccepted = async () => {
    await axios.post(
      "/users/createMessageGroup",
      { user, requestedUser },
      config
    );
    const res = await axios.post(
      "/users/acceptMatchRequest",
      {
        user,
        requestedUser
      },
      config
    );
    if (res.status === 200) {
      props.history.push("/messages");
    }
  };
  const handeDeclined = () => {};
  console.log(props.requestedUser);
  return (
    <Notifcation_View
      requestedUser={props.requestedUser}
      handleAccepted={handleAccepted}
      state={state}
      handleDeclined={handeDeclined}
    />
  );
};

export default Notification;
