import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import fetchUserData from "../helpers/fetchUserData";
import { withRouter } from "react-router";
import { NewMessageContext } from "../context/NewMessageContext";
import NavBar_View from "./NavBar_View";

const NavBar = props => {
  const [showNav, setShowNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showNewMessageNotification, setShowNewMessageNotification] = useState(
    false
  );
  const token = Cookies.get("token");
  const [user, setUser] = useContext(UserContext);
  const [newMessage] = useContext(NewMessageContext);
  let paramsUrlId;
  let urlsToConsiderforMessagesNotification = ["/login", "/"];

  const logout = async () => {
    setLoggedIn(false);
    setUser({});
    Cookies.remove("token");
    await axios.get("/users/logout");
    setShowNav(false);
    props.history.push("/");
  };
  useEffect(() => {
    if (
      !urlsToConsiderforMessagesNotification.includes(props.location.pathname)
    ) {
      paramsUrlId = props.location.pathname.match(/[^\/]+$/)[0];
    }
    if (paramsUrlId && !newMessage.groupId.includes(paramsUrlId)) {
      setShowNewMessageNotification(false);
    } else if (props.location.pathname === "/messages") {
      setShowNewMessageNotification(false);
    } else if (
      newMessage.viewed === false &&
      props.location.pathname !== "/messages"
    ) {
      setShowNewMessageNotification(true);
    } else if (paramsUrlId && newMessage.groupId.includes(paramsUrlId)) {
      setShowNewMessageNotification(true);
    }
  }, [newMessage]);
  useEffect(() => {
    if (token && !user.username) {
      const fetchData = async () => {
        let userProfile = await fetchUserData();
        setUser(userProfile);
      };
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);
  const handleMessagesClick = () => {
    setShowNewMessageNotification(false);
    setShowNav(false);
  };
  return (
    <NavBar_View
      showNav={showNav}
      setShowNav={setShowNav}
      loggedIn={loggedIn}
      logout={logout}
      showNewMessageNotification={showNewMessageNotification}
      handleMessagesClick={handleMessagesClick}
    />
  );
};

export default withRouter(NavBar);
