import axios from "axios";

export const getRestaurants = async () => {
  return await axios
    .get("https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb")
    .then((response) => response?.data?.data)
    .catch((err) => console.log(err));
};
