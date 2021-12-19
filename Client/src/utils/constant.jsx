export const apiURL = "http://localhost:5555/api";
export const apiURLCitizen = "http://localhost:5555/api/citizen";
export const LOCAL_STORAGE_TOKEN_NAME = "LOCAL_TOKEN";
export const locations = [
  "Tỉnh/Thành Phố",
  "Quận/Huyện",
  "Xã/Phường",
  "Thôn/Xóm",
];

export const getDOB = (date) => {
  console.log(date);
  const day =
    date.getDay().toString().length === 2 ? date.getDay() : `0${date.getDay()}`;
  const month =
    date.getMonth().toString().length === 2
      ? date.getMonth()
      : `0${date.getMonth()}`;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
};
