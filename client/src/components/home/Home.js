import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard/ProfileCard";
import axios from "axios";

const Home = () => {
  const [userList, setUserList] = useState([]);
  let user = sessionStorage.getItem("userData");
  user = JSON.parse(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/users/fetchusers");
      setUserList(res.data.users);
    };
    fetchData();
  }, []);
  return (
    <UserListContainer>
      {userList.map(user => (
        <ProfileCard user={user} />
      ))}
    </UserListContainer>
  );
};

const UserListContainer = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
`;
export default Home;
