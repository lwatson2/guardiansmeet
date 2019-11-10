import React from "react";
import {
  ProfileContainer,
  ProfileFormContainer,
  ProfilePictureContainer,
  ProfilePictureCirlceContainer,
  ProfilePicture,
  ProfilePictureLabel,
  ProfilePictureInput,
  ChangePictureLabel,
  FormSectionContainer,
  ProfileLabel,
  ProfileFormInput,
  PreferenceContainer,
  PreferenceSelect,
  GenederSelectContainer,
  GenderSelect,
  BioSectionContainer,
  ProfileBio,
  ProfileBtnContainer,
  ProfileSubmitBtn,
  ErrorMessageContainer,
  ErrorMessage
} from "./CreateProfile_Styles";
const CreateProfile_View = ({
  handleSubmit,
  errors,
  values,
  handleChange,
  handleProfilePicture,
  profilePicture,
  errorMessage
}) => {
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
          {errorMessage && (
            <ErrorMessageContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageContainer>
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
          <FormSectionContainer>
            <ProfileLabel htmlFor="name">Username</ProfileLabel>
            <ProfileFormInput
              borderColor={
                errors.username ? "1px solid hsl(0, 75%, 45%)" : "none"
              }
              type="text"
              value={values.username || ""}
              onChange={handleChange}
              id="username"
              name="username"
              required
            />
            {errors.username && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.username}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </FormSectionContainer>

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
              width="150px"
            />
            {errors.age && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.age}</ErrorMessage>
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
          <GenederSelectContainer>
            <GenderSelect
              borderColor={
                errors.gender ? "1px solid hsl(0, 75%, 45%)" : "none"
              }
              name="gender"
              id="gender"
              value={values.gender || ""}
              onChange={handleChange}
              required
            >
              <option value="" hidden>
                Choose your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </GenderSelect>
            {errors.gender && (
              <ErrorMessageContainer>
                <ErrorMessage>{errors.gender}</ErrorMessage>
              </ErrorMessageContainer>
            )}
          </GenederSelectContainer>
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
              required
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

export default CreateProfile_View;
