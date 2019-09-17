const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Please enter your name";
  }
  if (values.name && values.name.length > 150) {
    errors.name = "name cannot be greater than 50 characters.";
  }
  if (!values.password) {
    errors.password = "Please enter your password";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Password must be greater than six Characters";
  }
  if (values.password && values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  if (!values.preference) {
    errors.preference = "Please choose a preference";
  }
  if (
    values.preference &&
    (values.preference !== "Male") |
      (values.preference !== "Female") |
      (values.preference !== "Both") |
      (values.preference !== "Other")
  ) {
    errors.preference = "Please choose a preference";
  }
  if (values.bio && values.bio.length > 150) {
    errors.bio = "Please limit bio to 150 characters";
  }
  return errors;
};
export default validate;
