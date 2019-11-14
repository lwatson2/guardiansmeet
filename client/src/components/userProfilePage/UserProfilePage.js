import React, { useContext, useState, useEffect } from "react";
import { UserProfilePage_View } from "./UserProfilePage_View";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/CreateProfileRules";

export const UserProfilePage = () => {
  const [user] = useContext(UserContext);
  const [currentProfilePicture, setCurrentProfilePicture] = useState();

  const handleUpdate = async () => {};
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleUpdate,
    validate
  );
  useEffect(() => {
    if (user.id) {
      setCurrentProfilePicture(user.profilePicture);
      values.name = user.name;
      values.username = user.username;
      values.bio = user.bio;
    }
    return () => {
      setCurrentProfilePicture();
    };
  }, [user]);
  const handleProfilePicture = () => {};
  return (
    <UserProfilePage_View
      user={user}
      errors={errors}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleProfilePicture={handleProfilePicture}
      currentProfilePicture={currentProfilePicture}
    />
  );
};
