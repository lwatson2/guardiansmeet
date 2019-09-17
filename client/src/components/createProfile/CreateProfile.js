import React, { useState } from "react";
import styled from "styled-components";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/CreateProfileRules";

const ProfileContainer = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;
const ProfileFormContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 40px;
  background: hsl(210, 33%, 54%);
  justify-items: center;
  align-items: center;
  color: hsl(214, 33%, 97%);
  padding: 20px;
  border-radius: 20px;
  width: 300px;
  grid-template-columns: 1fr;
  @media screen and (min-width: 767px) {
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
  border: 2px solid hsl(209, 18%, 77%);
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
const ProfilePictureLabel = styled.label``;
const ProfilePictureInput = styled.input`
  display: none;
`;
const ChangePictureLabel = styled.label`
  background: grey;
  padding: 0 5px;
  border-radius: 6px;
`;
const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ProfileLabel = styled.label`
  padding-bottom: 10px;
`;
const ProfileFormInput = styled.input`
  border-radius: 20px;
  outline: none;
  border: none;
  height: 27px;
  padding-left: 10px;
`;
const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media screen and (min-width: 767px) {
    grid-column: span 2;
    width: 180px;
  }
`;
const PreferenceSelect = styled.select`
  width: inherit;
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
`;
const CreateProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const handleProfilePicture = event => {
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleLogin = () => {};
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <ProfileContainer>
      <form onSubmit={handleSubmit}>
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
            </ProfilePictureContainer>
          )}
          <FormSectionContainer>
            <ProfileLabel htmlFor="name">Name</ProfileLabel>
            <ProfileFormInput
              type="text"
              value={values.name || ""}
              onChange={handleChange}
              id="name"
              name="name"
            />
          </FormSectionContainer>
          <FormSectionContainer>
            <ProfileLabel htmlFor="password">Password</ProfileLabel>
            <ProfileFormInput
              type="password"
              value={values.password || ""}
              onChange={handleChange}
              id="password"
              name="password"
            />
          </FormSectionContainer>
          <PreferenceContainer>
            <PreferenceSelect name="preference" id="preference">
              <option value="" hidden>
                Choose your preference
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Both">Both</option>
              <option value="Other">Other</option>
            </PreferenceSelect>
          </PreferenceContainer>
          <BioSectionContainer>
            <ProfileLabel htmlfor="bio">Enter a bio</ProfileLabel>
            <ProfileBio rows="5" cols="40"></ProfileBio>
          </BioSectionContainer>
        </ProfileFormContainer>
      </form>
    </ProfileContainer>
  );
};

export default CreateProfile;
