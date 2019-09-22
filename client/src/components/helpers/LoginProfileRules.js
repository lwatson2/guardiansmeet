const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Please enter your name.";
  }
  if (values.name && values.name.length > 150) {
    errors.name = "Name cannot be longer than 150 characters.";
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
