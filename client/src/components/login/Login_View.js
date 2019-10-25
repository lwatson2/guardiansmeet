import React from "react";
import {
  LoginButton,
  LoginButtonContainer,
  LoginFormContainer,
  LoginWrapper,
  ErrorMessageContainer,
  SuccessMessageContainer,
  SuccessMessage,
  ErrorMessage,
  LoginFormDetailsContainer,
  LoginFormInput,
  LoginFormLabel,
  LoginFormWrapper
} from "./Login_Styles";
const Login_View = ({
  isAuth,
  errMsg,
  handleSubmit,
  handleChange,
  values,
  errors
}) => {
  return (
    <LoginFormContainer>
      <LoginWrapper>
        {isAuth && (
          <SuccessMessageContainer>
            <SuccessMessage>Congrats! You may now login </SuccessMessage>
          </SuccessMessageContainer>
        )}
        {errMsg && (
          <ErrorMessageContainer>
            <ErrorMessage>{errMsg}</ErrorMessage>
          </ErrorMessageContainer>
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

export default Login_View;
