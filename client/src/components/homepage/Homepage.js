import React from "react";
import styled from "styled-components";

const HomePage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HomePageContainer = styled.div`
  color: hsl(210, 24%, 16%);
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;
const Button = styled.button`
  background: hsl(266, 55%, 47%);
  color: hsl(214, 33%, 97%);
  border: none;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.2);
  font-size: 16px;
  padding: 0 5px;
  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  }
`;

const Homepage = () => {
  return (
    <HomePage>
      <HomePageContainer>
        <h2>Eyes up Guardian</h2>
        <p>Your true love is waiting</p>
        <ButtonContainer>
          <Button>Create Profile</Button>
          <Button>Browse Guardians</Button>
        </ButtonContainer>
      </HomePageContainer>
    </HomePage>
  );
};

export default Homepage;
