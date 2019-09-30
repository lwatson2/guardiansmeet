import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";
import { device } from "../helpers/mediaQueries";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [userCount, setuserCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  let user = sessionStorage.getItem("userData");
  user = JSON.parse(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/fetchusers?offset=${offset}`);
      let users = res.data.users;
      if (user) {
        users = users.filter(users => users.username !== user.username);
      }
      setUserList(users);
      const response = await axios.get("/users/userList");
      const userCountNum = response.data.count - 1;
      setuserCount(userCountNum);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (onScreen && userList.length > 0 && userList.length < userCount) {
      const offsetUserQuery = offset + 2;
      let newUserList = [];
      const fetchData = async () => {
        const res = await axios.get(
          `/users/fetchusers?offset=${offsetUserQuery}`
        );
        newUserList = userList.concat(res.data.users);
        setOffset(offsetUserQuery);
        setUserList(newUserList);
      };
      fetchData();
    }
  }, [onScreen]);
  return (
    <UserListContainer>
      {userList.map(user => (
        <ProfileCard user={user} />
      ))}
      <LoadingContainer
        opactiy={userList.length < userCount ? "1" : "0"}
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
const LoadingContainer = styled.div`
  opacity: ${props => props.opactiy};
  align-self: end;
`;
export default Home;
