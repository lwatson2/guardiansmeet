const validate = values => {
  const choices = ["Male", "Female", "Both", "Other"];
  const genders = ["Male", "Female"];
  const errors = {};
  if (values.profilePic && values.profilePic.size > 200000) {
    errors.profilePicture = "Please limit profile pictures to 200kb";
  }
  if (!values.name) {
    errors.name = "Please enter your name";
  }
  if (values.name && values.name.length > 150) {
    errors.name = "Name cannot be greater than 150 characters.";
  }
  if (values.name && values.name.length < 2) {
    errors.name = "Name must be greater than 2 characters.";
  }
  if (values.name && !/^[a-zA-Z]*$/g.test(values.name)) {
    errors.name = "Invalid Characters";
  }
  if (!values.username) {
    errors.username = "Please enter your username";
  }
  if (values.username && values.username.length > 150) {
    errors.username = "Username cannot be greater than 150 characters.";
  }
  if (values.username && values.username.length < 2) {
    errors.username = "Username must be greater than 2 characters.";
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
  if (values.gender === "") {
    errors.gender = "Please choose a gender.";
  }
  if (values.gender && !genders.includes(values.gender)) {
    errors.gender = "Please choose a gender";
  }
  if (!values.age) {
    errors.age = "Select a age";
  }
  if (values.age > 80) {
    errors.age = "Please enter a number less than 80.";
  } else if (values.age < 18) {
    errors.age = "You must be 18 or over to create a profile.";
  }
  if (!values.bio) {
    errors.bio = "Please enter a bio";
  }

  if (values.bio && values.bio.length > 150) {
    errors.bio = "Please limit bio to 150 characters.";
  }

  return errors;
};
export default validate;
