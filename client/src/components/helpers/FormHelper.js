import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
const useForm = (callback, validate) => {
  const [user] = useContext(UserContext);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    console.log(errors);
    // Checks to make sure errors object is empty and isSubmitting is true
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(setValues);
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values, user));
  };

  const handleChange = event => {
    event.persist();
    if (event.target.name === "profilePicture") {
      setValues(values => ({
        ...values,
        profilePicture: event.target.files[0]
      }));
    } else {
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
