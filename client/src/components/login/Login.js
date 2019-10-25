import React, { useState, useContext } from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/LoginProfileRules";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
import Login_View from "./Login_View";

const Login = props => {
  //For axios to use headers do axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
  const isAuth = sessionStorage.getItem("isAuth");
  const [user, setUser] = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const handleLogin = async setValues => {
    const res = await axios.post("/users/login", values);
    if (res.data.err) {
      return setErrMsg(res.data.err.message);
    }
    Cookies.set("token", res.data.token);
    setUser(res.data.user);
    setValues({});
    props.history.push("/");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <Login_View
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isAuth={isAuth}
      errMsg={errMsg}
    />
  );
};

export default Login;
