import React from "react";
import {
  Navbar,
  HamburgerContainer,
  HamburgerMenu,
  TopHamburgerLine,
  MiddleHamburgerLine,
  BottomHamburgerLine,
  NavItems,
  NavListItem,
  NewMessageNotificationIcon
} from "./NavBar_Styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar_View = ({
  showNav,
  setShowNav,
  loggedIn,
  logout,
  showNewMessageNotification,
  handleMessagesClick
}) => {
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
          <Link to="/messages">
            <NavListItem
              position="relative"
              onClick={() => handleMessagesClick()}
            >
              Messages
            </NavListItem>
            {showNewMessageNotification && (
              <NewMessageNotificationIcon>
                <FontAwesomeIcon icon="exclamation" size="sm" />
              </NewMessageNotificationIcon>
            )}
          </Link>
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

export default NavBar_View;
