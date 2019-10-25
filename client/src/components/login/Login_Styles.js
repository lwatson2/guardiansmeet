import styled from "styled-components";
import { device } from "../helpers/mediaQueries";

export const LoginFormContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginWrapper = styled.div`
  background: hsl(211, 13%, 65%);
  height: 300px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;
export const LoginFormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;
export const LoginFormDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;
export const LoginFormLabel = styled.label`
  padding-bottom: 10px;
`;
export const LoginFormInput = styled.input`
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
export const LoginButtonContainer = styled.div``;
export const LoginButton = styled.button`
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
export const ErrorMessageContainer = styled.div`
  background: hsla(0, 100%, 80%, 1);
  margin-top: 5px;
  font-size: 13px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;
export const ErrorMessage = styled.span`
  color: hsl(0, 85%, 27%);
  padding: 0 5px;
`;
export const SuccessMessageContainer = styled.div`
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
export const SuccessMessage = styled.p``;
