import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import {
  UserListContainer,
  ProfileCardContainer,
  LoadingContainer
} from "./Home_Styles";
import ProfileCard from "../profileCard/ProfileCard";

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
  const socket = io.connect("https://guardiansmeetsite.herokuapp.com/", {
    secure: true
  });

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
      const offsetUserQuery = offset + 6;
      let newUserList = [];
      let res;
      const fetchUserList = async () => {
        if (user.id) {
          res = await axios.get(
            `/users/fetchusers?offset=${offsetUserQuery}&id=${user.id}`
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
    if (user) {
      res = await axios.get(`/users/fetchusers?offset=0&id=${user.id}`);
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
    <UserListContainer>
      {userList.map(userItem => (
        <ProfileCardContainer key={userItem._id}>
          <ProfileCard
            user={userItem}
            handleChat={handleChat}
            showChatBtn={true}
            loggedInUser={user}
          />
        </ProfileCardContainer>
      ))}
      <LoadingContainer
        opactiy={userList.length >= userCount && onScreen ? "0" : "1"}
        ref={ref}
      >
        Loading
      </LoadingContainer>
    </UserListContainer>
  );
};

export default Home;
