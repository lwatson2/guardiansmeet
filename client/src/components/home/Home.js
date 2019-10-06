import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import { device } from "../helpers/mediaQueries";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000", { secure: true });

const Msg = ({ user }) => {
  console.log(user);
  return (
    <ToastMessageContainer>
      <ToastMessage> {user} wants to chat</ToastMessage>
      <ToastProfileButton>View Profile</ToastProfileButton>
    </ToastMessageContainer>
  );
};

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [userCount, setuserCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
    socketFunctions();
  }, []);
  useEffect(() => {
    if (userList.length > userCount || offset === userCount) {
      return;
    }
    if (onScreen && userList.length > 0 && userList.length <= userCount) {
      const offsetUserQuery = offset + 2;
      let newUserList = [];
      let res;
      console.log("false");
      const fetchData = async () => {
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
      fetchData();
    }
  }, [onScreen]);
  useEffect(() => {
    fetchUsers();
  }, [user]);
  const fetchUsers = async () => {
    let res;
    if (user.username) {
      res = await axios.get(
        `/users/fetchusers?offset=${offset}&username=${user.username}`
      );
    } else {
      res = await axios.get(`/users/fetchusers?offset=${offset}`);
    }
    let users = res.data.users;
    setUserList(users);
    const response = await axios.get("/users/userList");
    let userCountNum = response.data.count;
    setuserCount(userCountNum);
  };
  const socketFunctions = () => {
    socket.on("recievedChatRequest", data => {
      if (data.currentUser === user.username) {
        showToast(data.requestedUser);
      }
    });
  };
  const handleChat = clickedUser => {
    console.log(clickedUser);
    socket.emit("sendChatRequest", { user, clickedUser });
  };
  const showToast = username => {
    toast(<Msg user={username} />, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };
  return (
    <UserListContainer>
      {userList.map(user => (
        <ProfileCard handleChat={handleChat} user={user} />
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

const ToastMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ToastMessage = styled.span`
  margin-bottom: 5px;
`;
const ToastProfileButton = styled.button`
  background: hsl(209, 20%, 25%);
  color: hsl(216, 33%, 97%);
  border: none;
  outline: none;
  height: 30px;
  width: 100px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  align-self: end;
  margin-left: auto;
`;

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
const LoadingContainer = styled.div`
  opacity: 0;
  align-self: end;
`;
export default Home;
