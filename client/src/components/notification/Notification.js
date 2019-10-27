import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Notifcation_View from "./Notification-view";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import { withRouter } from "react-router";

const Notification = props => {
  const [user] = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const token = Cookies.get("token");
  const { setShowUser } = props;
  let config = {
    headers: { Authorization: "Bearer " + token }
  };
  const handleAccepted = async () => {
    await axios.post(
      "/users/createMessageGroup",
      { user, requestedUser: props.requestedUser },
      config
    );
    const res = await axios.post(
      "/users/acceptMatchRequest",
      {
        user,
        requestedUser: props.requestedUser
      },
      config
    );
    if (res.status === 200) {
      setShowUser(false);
      props.history.push("/messages");
    }
  };
  const handeDeclined = () => {};
  return (
    <Notifcation_View
      requestedUser={props.requestedUser}
      handleAccepted={handleAccepted}
      handleDeclined={handeDeclined}
    />
  );
};

export default withRouter(Notification);
