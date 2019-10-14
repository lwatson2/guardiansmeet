import axios from "axios";
import Cookies from "js-cookie";

const fetchUserData = async () => {
  let token = Cookies.get("token");
  let config = {
    headers: { Authorization: "Bearer " + token }
  };

  const res = await axios.get("/users/fetchUserProfile", config);
  return res.data.userProfile;
};
export default fetchUserData;
