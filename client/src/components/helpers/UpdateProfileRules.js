const validate = (values, user) => {
  const errors = {};
  if (values.profilePicture && values.profilePicture.size > 200000) {
    errors.profilePicture = "Please limit profile pictures to 200kb";
  }
  if (values.profilePicture === user.profilePicture) {
    errors.profilePicture = "Please update your profile picture";
  }
  if (values.name === user.name) {
    errors.name = "Please update your name";
  }
  if (values.name && values.name.length > 150) {
    errors.name = "Name cannot be greater than 150 characters.";
  }
  if (values.name && values.name.length < 2) {
    errors.name = "Name must be greater than 2 characters.";
  }
  if (values.name && !/^[a-zA-Z ]+$/g.test(values.name)) {
    errors.name = "Invalid Characters";
  }
  if (values.username === user.username) {
    errors.username = "Please update your username";
  }
  if (values.username && values.username.length > 150) {
    errors.username = "Username cannot be greater than 150 characters.";
  }
  if (values.username && values.username.length < 2) {
    errors.username = "Username must be greater than 2 characters.";
  }
  if (values.bio === user.bio) {
    errors.bio = "Please update your bio";
  }

  if (values.bio && values.bio.length > 150) {
    errors.bio = "Please limit bio to 150 characters.";
  }
  return errors;
};
export default validate;
