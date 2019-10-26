const validate = values => {
  const errors = {};
  if (!values.message) {
    values.errors = "Please enter a message";
  }
  return errors;
};
export default validate;
