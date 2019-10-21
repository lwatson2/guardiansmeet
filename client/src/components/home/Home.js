import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import { device } from "../helpers/mediaQueries";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
const token = Cookies.get("token");

const Msg = ({ user, id, setUserNotificationId }) => {
  const handleClick = () => {
    setUserNotificationId(id);
  };
  return (
    <ToastMessageContainer>
      <ToastMessage> {user} wants to chat</ToastMessage>
      <ToastProfileButton onClick={handleClick}>
        View Profile
      </ToastProfileButton>
    </ToastMessageContainer>
  );
};

const Home = props => {
  const [userList, setUserList] = useState([]);
  const [userCount, setuserCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const token = Cookies.get("token");
  const [user] = useContext(UserContext);
  const [showUser, setShowUser] = useState(false);
  const [requestedUser, setrequestedUser] = useState({});
  const [userNotificationId, setUserNotificationId] = useState();
  const [currentUserUsername, setCurrentUserUsername] = useState();

  let config = {
    headers: { Authorization: "Bearer " + token }
  };
  const socket = io.connect("http://localhost:5000", { secure: true });

  useEffect(() => {
    fetchUsers();
    socket.on("connect", () => console.log("connected"));
  }, []);

  //Checks for unseen notifications on user login
  useEffect(() => {
    if (user.matched) {
      user.matched.forEach(match => {
        if (match.viewed === false) {
          showToast(match.username, match.id);
          axios.post("/users/setViewedMatched", { user, id: match.id }, config);
        }
      });
    }

    socket.on("recievedChatRequest", data => {
      setrequestedUser(data.requestedUser);
      setCurrentUserUsername(data.currentUser);
    });

    setOffset(0);
    setUserList([]);
    setuserCount(0);
    fetchUsers();
  }, [user]);

  //Runs whenever user clicks view profile on notification toast
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
  const handleDeclined = async () => {};
  //Toast config
  const showToast = (username, id) => {
    toast(
      <Msg
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
      {showUser && (
        <UserProfileContainer>
          <UserCardContainer>
            <ProfileCard user={requestedUser} showChatBtn={false} />
            <ChatRequestBtnContainer>
              <UserChatRequestBtn
                color="hsl(102, 97%, 16%)"
                background="hsl(101, 100%, 80%)"
                onClick={handleAccepted}
              >
                Accept
              </UserChatRequestBtn>
              <UserChatRequestBtn
                color="hsl(0, 85%, 27%)"
                background="hsl(0, 100%, 80%)"
                onClick={handleDeclined}
              >
                Decline
              </UserChatRequestBtn>
            </ChatRequestBtnContainer>
          </UserCardContainer>
        </UserProfileContainer>
      )}
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
const ProfileCardContainer = styled.div`
  margin: 50px 0;
`;
const UserProfileContainer = styled.div`
  background: hsla(0, 0%, 0%, 0.4);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserCardContainer = styled.div``;
const ChatRequestBtnContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
`;
const UserChatRequestBtn = styled.button`
  border: none;
  background: ${props => props.background};
  color: ${props => props.color};
  height: 30px;
  width: 100px;
  border-radius: 6px;
  cursor: pointer;
`;
const LoadingContainer = styled.div`
  opacity: 0;
  align-self: end;
`;
export default Home;
