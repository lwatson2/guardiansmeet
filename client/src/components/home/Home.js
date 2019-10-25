import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import { device } from "../helpers/mediaQueries";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";

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
    <UserListContainer>
      {userList.map(userItem => (
        <ProfileCardContainer>
          <ProfileCard
            handleChat={handleChat}
            user={userItem}
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

const UserListContainer = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-items: center;
  align-items: center;
  grid-gap: 30px;
  margin-top: 50px;
  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;
const ProfileCardContainer = styled.div`
  margin: 50px 0;
`;
const LoadingContainer = styled.div`
  opacity: 0;
  align-self: end;
`;
export default Home;
