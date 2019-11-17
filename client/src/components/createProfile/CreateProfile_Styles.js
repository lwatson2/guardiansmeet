import styled from "styled-components";
import { device } from "../helpers/mediaQueries";

export const ProfileContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
export const ProfileFormContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-gap: 30px;
  background: hsl(211, 10%, 53%);
  justify-items: center;
  align-items: center;
  padding: 20px;
  color: hsl(214, 33%, 97%);
  border-radius: 20px;
  width: 300px;
  grid-template-columns: 300px;
  @media ${device.tablet} {
    padding: 10px;
    width: 600px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ProfilePictureContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ProfilePictureCirlceContainer = styled.div`
  border: 2px solid hsl(211, 15%, 91%);
  border-radius: 100%;
  font-size: 11px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  margin: 10px 0;
`;
export const ProfilePicture = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;
export const ProfilePictureLabel = styled.label`
  cursor: pointer;
`;
export const ProfilePictureInput = styled.input`
  display: none;
`;
export const ChangePictureLabel = styled.label`
  background: hsl(209, 20%, 25%);
  padding: 0 5px;
  border-radius: 6px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.tablet} {
    width: auto;
  }
`;
export const ProfileLabel = styled.label`
  padding-bottom: 10px;
`;
export const ProfileFormInput = styled.input`
  border-radius: 10px;
  outline: none;
  border: ${props => props.borderColor};
  height: 34px;
  padding-left: 10px;
  background: hsl(211, 16%, 82%);
  color: hsl(209, 20%, 25%);
  width: ${props => props.width};
  transition: all 0.2s ease;
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
    background: hsl(211, 15%, 95%);
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
export const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media ${device.tablet} {
    width: 220px;
  }
`;
export const PreferenceSelect = styled.select`
  width: inherit;
  border: none;
  height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-color: hsl(211, 16%, 82%);
  background-size: 12px;
  background-position: calc(100% - 10px) center;
  background-repeat: no-repeat;
  font-size: 16px;
  border: ${props => props.borderColor};
  border-radius: 10px;
  cursor: pointer;
  padding-left: 5px;
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
    background: hsl(211, 15%, 95%);
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
export const GenederSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media ${device.tablet} {
    width: 220px;
  }
`;
export const GenderSelect = styled.select`
  width: inherit;
  border: none;
  height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-color: hsl(211, 16%, 82%);
  background-size: 12px;
  background-position: calc(100% - 10px) center;
  background-repeat: no-repeat;
  font-size: 16px;
  border: ${props => props.borderColor};
  border-radius: 10px;
  cursor: pointer;
  padding-left: 5px;
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
    background: hsl(211, 15%, 95%);
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
export const BioSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.tablet} {
    width: auto;
    grid-column: span 2;
  }
`;
export const ProfileBio = styled.textarea`
  resize: none;
  border-radius: 6px;
  border: none;
  padding: 6px;
  background: hsl(211, 16%, 82%);
  color: hsl(209, 20%, 25%);
  border: ${props => props.borderColor};
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
    background: hsl(211, 15%, 95%);
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
export const ProfileBtnContainer = styled.div`
  display: flex;
  @media ${device.tablet} {
    grid-column: 2;
  }
`;
export const ProfileSubmitBtn = styled.button`
  background: hsl(266, 55%, 47%);
  color: hsl(214, 33%, 97%);
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  :hover {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
`;
export const ErrorMessageContainer = styled.div`
  background: hsla(0, 100%, 80%, 1);
  margin: 5px 0;
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
