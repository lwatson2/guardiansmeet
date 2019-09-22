import React, { useState } from "react";
import styled from "styled-components";
import useForm from "../helpers/FormHelper";
import { device } from "../helpers/mediaQueries";
import validate from "../helpers/LoginProfileRules";
import axios from "axios";
const LoginFormContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginWrapper = styled.div`
  background: hsl(211, 13%, 65%);
  height: 300px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const LoginFormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;
const LoginFormDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;
const LoginFormLabel = styled.label`
  padding-bottom: 10px;
`;
const LoginFormInput = styled.input`
  border-radius: 10px;
  outline: none;
  border: ${props => props.borderColor};
  height: 34px;
  padding-left: 10px;
  background: hsl(211, 16%, 82%);
  color: hsl(209, 20%, 25%);
  transition: all 0.2s ease;
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
    background: hsl(211, 15%, 95%);
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const LoginButtonContainer = styled.div``;
const LoginButton = styled.button`
  background: hsl(262, 60%, 42%);
  border: none;
  color: hsl(216, 33%, 97%);
  height: 34px;
  width: 100px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
`;
const ErrorMessageContainer = styled.div`
  background: hsla(0, 100%, 80%, 1);
  margin-top: 5px;
  font-size: 13px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;
const ErrorMessage = styled.span`
  color: hsl(0, 85%, 27%);
  padding: 0 5px;
`;
const Login = () => {
  const handleLogin = async () => {
    const res = await axios.post("/users/login", values);
    console.log(res.data);
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <LoginFormContainer>
      <LoginWrapper>
        <form style={{ height: "100%", width: "100%" }} onSubmit={handleSubmit}>
          <LoginFormWrapper>
            <LoginFormDetailsContainer>
              <LoginFormLabel htmlFor="name">Name</LoginFormLabel>
              <LoginFormInput
                borderColor={
                  errors.name ? "1px solid hsl(0, 75%, 45%)" : "none"
                }
                type="text"
                value={values.name || ""}
                onChange={handleChange}
                id="name"
                name="name"
                required
              ></LoginFormInput>
              {errors.name && (
                <ErrorMessageContainer>
                  <ErrorMessage>{errors.name}</ErrorMessage>
                </ErrorMessageContainer>
              )}
            </LoginFormDetailsContainer>
            <LoginFormDetailsContainer>
              <LoginFormLabel htmlFor="password">Password</LoginFormLabel>
              <LoginFormInput
                borderColor={
                  errors.password ? "1px solid hsl(0, 75%, 45%)" : "none"
                }
                type="password"
                value={values.password || ""}
                onChange={handleChange}
                id="password"
                name="password"
                required
              ></LoginFormInput>
              {errors.password && (
                <ErrorMessageContainer>
                  <ErrorMessage>{errors.password}</ErrorMessage>
                </ErrorMessageContainer>
              )}
            </LoginFormDetailsContainer>
            <LoginButtonContainer>
              <LoginButton>Submit</LoginButton>
            </LoginButtonContainer>
          </LoginFormWrapper>
        </form>
      </LoginWrapper>
    </LoginFormContainer>
  );
};

export default Login;
