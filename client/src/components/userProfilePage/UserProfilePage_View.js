import React from "react";
import {
  UserProfilePageContainer,
  UserProfileComponentContainer,
  ProfilePictureSelectContainer,
  ProfilePictureSelectLabel,
  ProfilePictureSelectInput,
  FormItemContainer,
  FormItemLabel,
  FormItemInput,
  FormItemTextArea,
  UpdateProfileButton
} from "./UserProfilePage_Styles";
import {
  ProfilePictureContainer,
  ProfilePictureCirlceContainer,
  ProfilePicture
} from "../createProfile/CreateProfile_Styles";
import ProfilePicPlaceHolder from "../../images/Portrait_placeholder.png";

export const UserProfilePage_View = ({
  user,
  currentProfilePicture,
  handleSubmit,
  errors,
  values,
  handleChange,
  handleProfilePicture
}) => {
  return (
    <UserProfilePageContainer>
      <form>
        <UserProfileComponentContainer>
          <ProfilePictureContainer>
            <ProfilePictureCirlceContainer>
              <ProfilePicture
                src={
                  currentProfilePicture
                    ? currentProfilePicture
                    : ProfilePicPlaceHolder
                }
              />
            </ProfilePictureCirlceContainer>
            <ProfilePictureSelectContainer>
              <ProfilePictureSelectLabel htmlFor="profilePicture">
                Click to update profile picture
              </ProfilePictureSelectLabel>
              <ProfilePictureSelectInput
                type="file"
                onChange={handleProfilePicture}
                id="profilePicture"
                name="profilePicture"
                accept=".jpg, .png, .jpeg,"
              />
            </ProfilePictureSelectContainer>
          </ProfilePictureContainer>
          <FormItemContainer>
            <FormItemLabel htmlFor="name">Name</FormItemLabel>
            <FormItemInput
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
              value={values.name || ""}
            />
          </FormItemContainer>
          <FormItemContainer>
            <FormItemLabel htmlFor="username">Username</FormItemLabel>
            <FormItemInput
              name="username"
              type="text"
              onChange={handleChange}
              id="username"
              value={values.username || ""}
            />
          </FormItemContainer>
          <FormItemContainer column="1 / -1">
            <FormItemLabel htmlFor="bio">Bio</FormItemLabel>
            <FormItemTextArea
              rows="5"
              cols="40"
              name="bio"
              resize="none"
              id="bio"
              onChange={handleChange}
              value={values.bio || ""}
            />
          </FormItemContainer>
          <UpdateProfileButton>Save</UpdateProfileButton>
        </UserProfileComponentContainer>
      </form>
    </UserProfilePageContainer>
  );
};
