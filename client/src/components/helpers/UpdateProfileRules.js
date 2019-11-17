const validate = (values, user) => {
  const errors = {};
  if (values.profilePicture && values.profilePicture.size > 200000) {
    errors.profilePicture = "Please limit profile pictures to 200kb";
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
  if (values.username && values.username.length > 150) {
    errors.username = "Username cannot be greater than 150 characters.";
  }
  if (values.username && values.username.length < 2) {
    errors.username = "Username must be greater than 2 characters.";
  }

  if (values.bio && values.bio.length > 150) {
    errors.bio = "Please limit bio to 150 characters.";
  }
  return errors;
};
export default validate;
