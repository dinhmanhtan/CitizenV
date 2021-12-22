import socketIOClient from "socket.io-client";

export const socketIO = socketIOClient("http://localhost:5555");
export const apiURL = "http://localhost:5555/api";
export const apiURLCitizen = "http://localhost:5555/api/citizen";
export const LOCAL_STORAGE_TOKEN_NAME = "LOCAL_TOKEN";
export const locations = [
  "Tỉnh/Thành Phố",
  "Quận/Huyện",
  "Xã/Phường",
  "Thôn/Xóm",
];

// epxort const levels = ["Tổng cục Dân số  Bộ Y tế ","Chi cục dân số Sở Y tế tỉnh ","Phòng Y tế huyện ", "Trạm Y tế xã"]

export const getDOB = (dateTest) => {
  const date = new Date(dateTest);
  // console.log(date);
  const day =
    date.getDate().toString().length === 2
      ? date.getDate()
      : `0${date.getDate()}`;
  const month =
    date.getMonth().toString().length === 2
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
};

// 2001-11-06T00:00:00.000Z
// export const getDOB = (dateStr) => {
//   const arr_dob = dateStr.substring(0, 10).split("-");
//   const dob = arr_dob[2] + "/" + arr_dob[1] + "/" + arr_dob[0];
//   return dob;
// };
