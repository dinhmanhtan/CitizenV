function getAge(age) {
  if (age < 20) {
    return "0-20";
  } else if (age < 40) {
    return "20-40";
  } else if (age < 60) {
    return "40-60";
  } else {
    return "hon60";
  }
}

export const analytic = (id, popList) => {
  // console.log(popList);

  if (id && popList) {
    // Lọc dữ liệu từ id đầu vào
    var filteredData = Array.isArray(id)
      ? id.map((ID) => {
          const filter = popList.filter((person) =>
            person.idAddress.startsWith(ID)
          );
          return filter;
        })
      : popList.filter((person) => person.idAddress.startsWith(id));

    // map Tra ve 1 mang 1 phan tu -> lay phan tu 0
    if (Array.isArray(id)) filteredData = filteredData[0];

    filteredData = id === "00" ? popList : filteredData;

    console.log(Array.isArray(id), filteredData);

    // Lấy địa chỉ id của các vùng con

    var arrSubID;
    if (!Array.isArray(id)) {
      const setSubID = new Set();

      for (let i = 0; i < filteredData.length; i++) {
        if (id === "00") {
          const subID = filteredData[i].idAddress.toString().substring(0, 2);
          setSubID.add(subID);
        } else {
          const subID = filteredData[i].idAddress
            .toString()
            .substring(0, id.length + 2);
          setSubID.add(subID);
        }
      }
      arrSubID = [...setSubID];
    } else arrSubID = id;
    console.log(arrSubID);

    //

    const newData = {};
    let dataTest = [];

    const newDataAge = {
      "0-20": 0,
      "20-40": 0,
      "40-60": 0,
      hon60: 0,
    };

    for (var i of filteredData) {
      // console.log(i.sex);
      if (!newData[i.idAddress]) {
        newData[i.idAddress] = {
          soluong: 0,
          nam: 0,
          nữ: 0,
        };
      }
      newData[i.idAddress].soluong++;
      newData[i.idAddress][i.sex]++;

      const DOB = new Date(i.DOB);
      const currentYear = new Date();
      const age = currentYear.getFullYear() - DOB.getFullYear();
      // console.log(age);
      const doTuoi = getAge(age);
      newDataAge[doTuoi]++;
    }

    // // xử lý dữ liệu theo dân số từng vùng, giới tính
    // for (var i in newData) {
    //   dataTest = [
    //     ...dataTest,
    //     {
    //       address: i,
    //       ...newData[i],
    //     },
    //   ];
    // }

    // xử lý dữ liệu theo tuổi
  }
};
