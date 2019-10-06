import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { device } from "../helpers/mediaQueries";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get("token");
  const [user, setUser] = useContext(UserContext);

  const logout = async () => {
    setLoggedIn(false);
    setUser({});
    Cookies.remove("token");
    await axios.get("/users/logout");
    setShowNav(false);
  };
  useEffect(() => {
    if (!user.username && token) {
      const { user } = JSON.parse(atob(token.split(".")[1]));
      const { _id } = user;
      const fetchUser = async () => {
        const { data } = await axios.get(`/users/refreshUser?id=${_id}`);
        setUser(data.user);
      };
      fetchUser();
    }
  }, []);
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);
  return (
    <Navbar>
      <HamburgerContainer>
        <HamburgerMenu onClick={() => setShowNav(!showNav)}>
          <TopHamburgerLine transform={showNav ? "rotate(45deg)" : "none"} />
          <MiddleHamburgerLine
            opacity={showNav ? "0" : "1"}
            transform={showNav ? "translateX(-16px)" : "none"}
          />
          <BottomHamburgerLine
            transform={showNav ? "translateX(-1px) rotate(-45deg)" : "none"}
          />
        </HamburgerMenu>
      </HamburgerContainer>
      {loggedIn ? (
        <NavItems
          maxHeight={showNav ? "300px" : "0"}
          opacity={showNav ? "1" : "0"}
        >
          <Link to="/">
            <NavListItem onClick={() => setShowNav(false)}>Home</NavListItem>
          </Link>
          <NavListItem onClick={() => setShowNav(false)}>Messages</NavListItem>
          <NavListItem onClick={() => setShowNav(false)}>Profile</NavListItem>
          <NavListItem onClick={() => logout()}>Logout</NavListItem>
        </NavItems>
      ) : (
        <NavItems
          maxHeight={showNav ? "300px" : "0"}
          opacity={showNav ? "1" : "0"}
        >
          <Link to="/">
            <NavListItem onClick={() => setShowNav(false)}>Home</NavListItem>
          </Link>
          <Link to="/new-profile">
            <NavListItem onClick={() => setShowNav(false)}>
              Create Profile
            </NavListItem>
          </Link>
          <Link to="/login">
            <NavListItem onClick={() => setShowNav(false)}>Login</NavListItem>
          </Link>
        </NavItems>
      )}
    </Navbar>
  );
};

export default NavBar;
const Navbar = styled.nav`
  background: hsl(211, 18%, 30%);
  height: 45px;
  position: static;
  top: 0;
`;
const HamburgerContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  @media ${device.tablet} {
    display: none;
  }
`;
const HamburgerMenu = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-right: 20px;
  margin-left: auto;
  cursor: pointer;
`;
const Line = css`
  width: 20px;
  height: 2px;
  background: hsl(210, 24%, 16%);
  transition: all 0.4s ease;
  display: block;
  background-color: hsl(216, 33%, 97%);
`;
const TopHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
    transform-origin: top left;
    margin-bottom: 5px;
`;
const MiddleHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
   opacity: ${props => props.opacity};
`;
const BottomHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
    transform-origin: top left;
    margin-top: 5px;
`;
const NavItems = styled.div`
  max-height: ${props => props.maxHeight};
  height: auto;
  display: flex;
  opacity: ${props => props.opacity};
  transition: max-height 0.4s, opacity 0.6s ease;
  background: hsl(211, 18%, 30%);
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  flex-direction: column;
  color: hsl(216, 33%, 97%);
  position: relative;
  z-index: 2;
  @media ${device.tablet} {
    max-height: 100px;
    flex-direction: row;
    opacity: 1;
  }
`;

const NavListItem = styled.button`
  background: transparent;
  border: none;
  color: hsl(216, 33%, 97%);
  font-size: 16px;
  cursor: pointer;
  margin: 5px 0;
  ::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background: hsl(216, 33%, 97%);
    -webkit-transition: width 0.3s;
    transition: width 0.3s;
  }
  :hover::after {
    width: 100%;
  }
`;
