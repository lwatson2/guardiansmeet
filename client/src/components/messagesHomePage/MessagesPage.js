import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/LoginProfileRules";
import MessagesPage_View from "./MessagesPage_View";

const MessagesPage = ({ socket }) => {
  const [user] = useContext(UserContext);
  console.log(socket);
  const handleSendMessage = () => {
    console.log("true");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleSendMessage,
    validate
  );
  return (
    <MessagesPage_View
      user={user}
      errors={errors}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default MessagesPage;
