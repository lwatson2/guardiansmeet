import React, { useContext, useState, useEffect } from "react";
import { UserProfilePage_View } from "./UserProfilePage_View";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/UpdateProfileRules";
import axios from "axios";

export const UserProfilePage = props => {
  const [user] = useContext(UserContext);
  const [currentProfilePicture, setCurrentProfilePicture] = useState();

  const handleUpdate = async setValues => {
    let formData = new FormData();
    values.name = values.name.trim();
    if (values.bio) {
      values.bio = values.bio.replace(/[\r\n]+/g, " ");
    }
    Object.keys(values).forEach(value => {
      if (values[value] !== user[value]) {
        formData.append(`${value}`, values[value]);
      }
    });
    formData.append("currentProfilePicture", user.profilePicture);
    const res = await axios.post(
      `/users/updateProfile?id=${user.id}&currentProfilePicture=${user.profilePicture}`,
      formData
    );
    // if (res.data.err) {
    //   return (errors = res.data.msg);
    // }

    // setValues({});
    // props.history.push("/my-profile");
  };
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
      values.profilePicture = user.profilePicture;
    }
    return () => {
      setCurrentProfilePicture();
    };
  }, [user]);

  const handleProfilePicture = event => {
    handleChange(event);
    setCurrentProfilePicture(URL.createObjectURL(event.target.files[0]));
  };
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
