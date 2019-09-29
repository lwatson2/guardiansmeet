import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";
import useOnScreen from "../helpers/useInfiniteScroll";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [userCount, setuserCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  const onScreen = useOnScreen(ref, {
    threshold: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/fetchusers?offset=${offset}`);
      setUserList(res.data.users);
      const response = await axios.get("/users/userList");
      setuserCount(response.data.count);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(onScreen);
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
      <div
        style={userList.length < userCount ? { opacity: 1 } : { opacity: 0 }}
        ref={ref}
      >
        Loading
      </div>
    </UserListContainer>
  );
};

const UserListContainer = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-items: center;
  align-items: center;
  grid-gap: 30px;
  margin-top: 50px;
`;
export default Home;
