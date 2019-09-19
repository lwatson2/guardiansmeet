const validate = values => {
  const choices = ["Male", "Female", "Both", "Other"];
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
    errors.password = "Password must be greater than six characters.";
  }
  if (values.password && values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  if (values.preference === "") {
    errors.preference = "Please choose a preference.";
  }
  if (values.preference && !choices.includes(values.preference)) {
    errors.preference = "Please choose a preference";
  }
  if (!values.age) {
    errors.age = "Select a age";
  }
  if (values.age > 80) {
    errors.age = "Please enter a number less than 80.";
  } else if (values.age < 18) {
    errors.age = "You must be 18 or over to create a profile.";
  }
  if (values.bio && values.bio.length > 150) {
    errors.bio = "Please limit bio to 150 characters.";
  }

  return errors;
};
export default validate;
