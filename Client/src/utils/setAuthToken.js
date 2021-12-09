import axios from "axios";

const setAuthToken = (token) => {
  // console.log(token);
  if (token) {
    // Set header mặc định là Authorization:{token}  khi gửi request lên server

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Xóa header

    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
