const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Please enter your username.";
  }
  if (values.username && values.username.length > 150) {
    errors.username = "Username cannot be longer than 150 characters.";
  }
  if (!values.password) {
    errors.password = "Please enter your password.";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Password must be greater than six characters";
  }
  return errors;
};
export default validate;
