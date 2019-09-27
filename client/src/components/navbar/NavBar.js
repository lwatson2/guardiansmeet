import React, { useState } from "react";
import styled, { css } from "styled-components";
import { device } from "../helpers/mediaQueries";
const Navbar = styled.nav`
  background: hsl(211, 12%, 42%);
  height: 30px;
  position: static;
  top: 0;
`;
const HamburgerContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`;
const HamburgerMenu = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-right: 20px;
  margin-left: auto;
  cursor: pointer;
  @media ${device.tablet} {
    display: none;
  }
`;
const Line = css`
  width: 20px;
  height: 2px;
  background: hsl(210, 24%, 16%);
  transition: all 0.2s ease;
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
  opacity: ${props => props.opacity};
  width: 100%;
  transition: max-height 0.4s, opacity 0.6s ease;
  background: blue;
  overflow: hidden;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
  padding: 10px;
`;

const NavListItem = styled.p``;
const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
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
      <NavItems
        height={showNav ? "auto" : null}
        maxHeight={showNav ? "300px" : "0"}
        opacity={showNav ? "1" : "0"}
      >
        <NavListItem>Messages</NavListItem>
        <NavListItem>Profile</NavListItem>
        <NavListItem>Notifications</NavListItem>
      </NavItems>
    </Navbar>
  );
};

export default NavBar;
