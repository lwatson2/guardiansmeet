import React, { useState } from "react";
import styled from "styled-components";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/CreateProfileRules";
import axios from "axios";

const ProfileContainer = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  @media screen and (min-width: 767px) {
    margin: 0;
  }
`;
const ProfileFormContainer = styled.div`
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
  grid-template-columns: 1fr;
  @media screen and (min-width: 767px) {
    padding: 10px;
    width: 600px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ProfilePictureContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfilePictureCirlceContainer = styled.div`
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
const ProfilePicture = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;
const ProfilePictureLabel = styled.label`
  cursor: pointer;
`;
const ProfilePictureInput = styled.input`
  display: none;
`;
const ChangePictureLabel = styled.label`
  background: hsl(209, 20%, 25%);
  padding: 0 5px;
  border-radius: 6px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 767px) {
    width: auto;
  }
`;
const ProfileLabel = styled.label`
  padding-bottom: 10px;
`;
const ProfileFormInput = styled.input`
  border-radius: 10px;
  outline: none;
  border: ${props => props.borderColor};
  height: 34px;
  padding-left: 10px;
  background: hsl(211, 16%, 82%);
  color: hsl(209, 20%, 25%);
  :focus {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.3);
  }
  @media screen and (min-width: 767px) {
    font-size: 16px;
  }
`;
const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media screen and (min-width: 767px) {
    width: 220px;
    align-self: end;
  }
`;
const PreferenceSelect = styled.select`
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
  :focus {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
  @media screen and (min-width: 767px) {
    font-size: 16px;
  }
`;
const BioSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 767px) {
    width: auto;
    grid-column: span 2;
  }
`;
const ProfileBio = styled.textarea`
  resize: none;
  border-radius: 6px;
  border: none;
  padding: 6px;
  background: hsl(211, 16%, 82%);
  color: hsl(209, 20%, 25%);
  border: ${props => props.borderColor};
  :focus {
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.3);
  }
  @media screen and (min-width: 767px) {
    font-size: 16px;
  }
`;
const ProfileBtnContainer = styled.div`
  display: flex;
  @media screen and (min-width: 767px) {
    grid-column: 2;
  }
`;
const ProfileSubmitBtn = styled.button`
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
const CreateProfile = props => {
  const [profilePicture, setProfilePicture] = useState(null);
  const handleProfilePicture = event => {
    // let formData = new FormData();
    // formData.append("file", event.target.files[0]);
    handleChange(event);
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleLogin = async setValues => {
    values.name = values.name.trim();
    if (values.bio) {
      values.bio = values.bio.replace(/[\r\n]+/g, " ");
    }
    let formData = new FormData();
    formData.append("file", values.profilePic);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("preference", values.preference);
    formData.append("age", values.age);
    formData.append("bio", values.bio);
    const res = await axios.post("/users/register", formData);

    sessionStorage.setItem("isAuth", true);
    setValues({});
    props.history.push("/login");
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <ProfileContainer>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <ProfileFormContainer>
          {profilePicture ? (
            <ProfilePictureContainer>
              <ProfilePictureCirlceContainer>
                <ProfilePicture src={profilePicture} />
              </ProfilePictureCirlceContainer>
              <ChangePictureLabel htmlFor="profilePicture">
                Click to change profile picture
              </ChangePictureLabel>
              <ProfilePictureInput
                type="file"
                onChange={handleProfilePicture}
                id="profilePicture"
                name="profilePicture"
                accept=".jpg, .png, .jpeg,"
              ></ProfilePictureInput>
              {errors.profilePicture && (
                <ErrorMessageContainer>
                  <ErrorMessage>{errors.profilePicture}</ErrorMessage>
                </ErrorMessageContainer>
              )}
            </ProfilePictureContainer>
          ) : (
            <ProfilePictureContainer>
              <ProfilePictureCirlceContainer>
                <ProfilePictureLabel htmlFor="profilePicture">
                  Click to upload profile picture
                </ProfilePictureLabel>
                <ProfilePictureInput
                  type="file"
                  onChange={handleProfilePicture}
                  id="profilePicture"
                  name="profilePicture"
                  accept=".jpg, .png, .jpeg,"
                ></ProfilePictureInput>
              </ProfilePictureCirlceContainer>
              {errors.profilePicture && (
                <ErrorMessageContainer>
                  <ErrorMessage>{errors.profilePicture}</ErrorMessage>
                </ErrorMessageContainer>
              )}
            </ProfilePictureContainer>
          )}
          <FormSectionContainer>
            <ProfileLabel htmlFor="name">Name</ProfileLabel>
            <ProfileFormInput
              borderColor={errors.name ? "1px solid hsl(0, 75%, 45%)" : "none"}
              type="text"
              value={values.name || ""}
              onChange={handleChange}
              id="name"
              name="name"
              required
            />
            {errors.name && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.name}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </FormSectionContainer>
          <FormSectionContainer>
            <ProfileLabel htmlFor="password">Password</ProfileLabel>
            <ProfileFormInput
              borderColor={
                errors.password ? "1px solid hsl(0, 75%, 45%)" : "none"
              }
              type="password"
              value={values.password || ""}
              onChange={handleChange}
              id="password"
              name="password"
              required
            />
            {errors.password && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.password}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </FormSectionContainer>
          <PreferenceContainer>
            <PreferenceSelect
              borderColor={
                errors.preference ? "1px solid hsl(0, 75%, 45%)" : "none"
              }
              name="preference"
              id="preference"
              value={values.preference || ""}
              onChange={handleChange}
              required
            >
              <option value="" hidden>
                Choose your preference
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Both">Both</option>
              <option value="Other">Other</option>
            </PreferenceSelect>
            {errors.preference && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.preference}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </PreferenceContainer>
          <FormSectionContainer>
            <ProfileLabel htmlFor="age">Age</ProfileLabel>
            <ProfileFormInput
              borderColor={errors.age ? "1px solid hsl(0, 75%, 45%)" : "none"}
              type="number"
              value={values.age || ""}
              onChange={handleChange}
              id="age"
              name="age"
              min="18"
              max="80"
              required
            />
            {errors.age && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.age}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </FormSectionContainer>
          <BioSectionContainer>
            <ProfileLabel htmlfor="bio">Enter a bio</ProfileLabel>
            <ProfileBio
              borderColor={errors.bio ? "1px solid hsl(0, 75%, 45%)" : "none"}
              rows="5"
              onChange={handleChange}
              cols="40"
              name="bio"
              value={values.bio}
              id="bio"
            ></ProfileBio>
            {errors.bio && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.bio}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </BioSectionContainer>
          <ProfileBtnContainer>
            <ProfileSubmitBtn>Submit</ProfileSubmitBtn>
          </ProfileBtnContainer>
        </ProfileFormContainer>
      </form>
    </ProfileContainer>
  );
};

export default CreateProfile;
