import React, { useState } from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/CreateProfileRules";
import axios from "axios";
import CreateProfile_View from "./CreateProfile_View";
import { ProfilePicture } from "./CreateProfile_Styles";

const CreateProfile = props => {
  const [errorMessage, setErrorMessage] = useState("");
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
    if (!values.bio) {
      values.bio = "";
    }
    let formData = new FormData();
    formData.append("file", values.profilePic);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("preference", values.preference);
    formData.append("age", values.age);
    formData.append("bio", values.bio);
    formData.append("username", values.username);
    formData.append("gender", values.gender);
    const res = await axios.post("/users/register", formData);
    if (res.data.err) {
      return setErrorMessage(res.data.msg);
    }

    sessionStorage.setItem("isAuth", true);
    setValues({});
    props.history.push("/login");
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <CreateProfile_View
      errors={errors}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleProfilePicture={handleProfilePicture}
      errorMessage={errorMessage}
      profilePicture={profilePicture}
    />
  );
};

export default CreateProfile;
