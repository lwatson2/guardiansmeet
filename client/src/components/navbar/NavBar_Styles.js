import styled, { css } from "styled-components";

import { device } from "../helpers/mediaQueries";

export const Navbar = styled.nav`
  background: hsl(211, 18%, 30%);
  height: 45px;
  position: static;
  top: 0;
`;
export const HamburgerContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  @media ${device.tablet} {
    display: none;
  }
`;
export const HamburgerMenu = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-right: 20px;
  margin-left: auto;
  cursor: pointer;
`;
export const Line = css`
  width: 20px;
  height: 2px;
  background: hsl(210, 24%, 16%);
  transition: all 0.4s ease;
  display: block;
  background-color: hsl(216, 33%, 97%);
`;
export const TopHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
    transform-origin: top left;
    margin-bottom: 5px;
`;
export const MiddleHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
   opacity: ${props => props.opacity};
`;
export const BottomHamburgerLine = styled.span`
    ${Line}
    transform: ${props => props.transform};
    transform-origin: top left;
    margin-top: 5px;
`;
export const NavItems = styled.div`
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

export const NavListItem = styled.button`
  background: transparent;
  border: none;
  color: hsl(216, 33%, 97%);
  font-size: 16px;
  cursor: pointer;
  margin: 5px 0;
  position: ${props => props.position};
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
export const NewMessageNotificationIcon = styled.svg`
  height: 10px;
  width: 10px;
  position: absolute;
  color: hsl(360, 90%, 57%);
`;
