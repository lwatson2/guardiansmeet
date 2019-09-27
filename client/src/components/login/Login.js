import React from "react";
import styled from "styled-components";
import useForm from "../helpers/FormHelper";
import { device } from "../helpers/mediaQueries";
import validate from "../helpers/LoginProfileRules";
import axios from "axios";

const Login = props => {
  //For axios to use headers do axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
  const isAuth = sessionStorage.getItem("isAuth");
  const handleLogin = async setValues => {
    const res = await axios.post("/users/login", values);
    document.cookie = `jwt-token=${res.data.token}`;
    sessionStorage.setItem("userData", JSON.stringify(res.data.user));
    setValues({});
    props.history.push("/");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <LoginFormContainer>
      <LoginWrapper>
        {isAuth && (
          <SuccessMessageContainer>
            <SuccessMessage>Congrats! You may now login </SuccessMessage>
          </SuccessMessageContainer>
        )}
        <form style={{ height: "100%", width: "100%" }} onSubmit={handleSubmit}>
          <LoginFormWrapper>
            <LoginFormDetailsContainer>
              <LoginFormLabel htmlFor="username">Username</LoginFormLabel>
              <LoginFormInput
                borderColor={
                  errors.username ? "1px solid hsl(0, 75%, 45%)" : "none"
                }
                type="text"
                value={values.username || ""}
                onChange={handleChange}
                id="username"
                name="username"
                required
              ></LoginFormInput>
              {errors.username && (
                <ErrorMessageContainer>
                  <ErrorMessage>{errors.username}</ErrorMessage>
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
  flex-direction: column;
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
const SuccessMessageContainer = styled.div`
  margin-top: 10px;
  background: hsl(101, 100%, 80%);
  height: 30px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: hsl(102, 97%, 16%);
`;
const SuccessMessage = styled.p``;
export default Login;
