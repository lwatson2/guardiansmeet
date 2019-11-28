import styled, { css } from "styled-components";

import { device } from "../helpers/mediaQueries";

export const UserListContainer = styled.section`
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
export const ProfileCardContainer = styled.div`
  margin: 50px 0;
`;
export const LoadingContainer = styled.div`
  opacity: 0;
  align-self: end;
  padding-bottom: 100px;
  width: 100%;
`;
