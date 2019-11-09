import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import Home_View from "./Home_View";
const Home = props => {
  const [userList, setUserList] = useState([]);
  const [userCount, setuserCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const [user] = useContext(UserContext);
  const token = Cookies.get("token");

  let config = {
    headers: { Authorization: "Bearer " + token }
  };
  const socket = io.connect("http://localhost:5000", { secure: true });

  useEffect(() => {
    fetchUsers();
  }, []);

  //Checks for unseen notifications on user login
  useEffect(() => {
    setOffset(0);
    setUserList([]);
    setuserCount(0);
    fetchUsers();
  }, [user]);

  //Use effect for the infinite loading component
  useEffect(() => {
    //If userlist array length is greater than the total number of users or the offset is greater than total number of users return
    if (userList.length > userCount || offset >= userCount) {
      return;
    }
    //Checks to make sure user is at bottom of page and that the userList array is contains items
    if (onScreen && userList.length > 0 && userList.length <= userCount) {
      const offsetUserQuery = offset + 2;
      let newUserList = [];
      let res;
      const fetchUserList = async () => {
        if (user.username) {
          res = await axios.get(
            `/users/fetchusers?offset=${offsetUserQuery}&username=${user.username}`
          );
        } else {
          res = await axios.get(`/users/fetchusers?offset=${offsetUserQuery}`);
        }
        newUserList = userList.concat(res.data.users);
        setOffset(offsetUserQuery);
        setUserList(newUserList);
      };
      fetchUserList();
    }
  }, [onScreen]);

  // Fetches users on page load
  const fetchUsers = async () => {
    let res;
    if (user.username) {
      res = await axios.get(
        `/users/fetchusers?offset=0&username=${user.username}`
      );
    } else {
      res = await axios.get(`/users/fetchusers?offset=0`);
    }
    let users = res.data.users;
    setUserList(users);
    const response = await axios.get("/users/userList");
    let userCountNum = response.data.count;
    setuserCount(userCountNum);
  };

  //Runs whenever the user clicks chat button
  const handleChat = clickedUser => {
    socket.emit("sendChatRequest", { user, clickedUser });
    axios.post("/users/updateSentMatches", { user, clickedUser }, config);
    axios.post("/users/handleMatchedUser", { user, clickedUser }, config);
  };

  return (
    <Home_View
      userCount={userCount}
      userList={userList}
      user={user}
      onScreen={onScreen}
      ref={ref}
    />
  );
};

export default Home;
