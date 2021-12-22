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

export const analytic = (id, popList, arrSubID) => {
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

    //

    const newData = {};
    let dataTest = [];

    var Analytic = [];
    var percent;
    const totalQuantity = filteredData.length;
    var percentFemale = 0,
      percentMale = 0;
    // MODE 1

    if (!Array.isArray(id)) {
      var totalMale = 0;
      var totalFemale = 0;
      var Analytic = arrSubID.map((subID) => {
        var quantity = 0;
        var male = 0;
        var female = 0;

        var DataAge = {
          "0-20": 0,
          "20-40": 0,
          "40-60": 0,
          hon60: 0,
        };

        for (var person of filteredData) {
          if (person.idAddress.startsWith(subID)) {
            const { DOB, sex } = person;
            quantity++;
            if (sex === "nam" || sex === "Nam") {
              male++;
              totalMale++;
            }
            if (sex === "nữ" || sex === "Nữ") {
              female++;
              totalFemale++;
            }

            const dob = new Date(DOB);
            const currentYear = new Date();
            const age = currentYear.getFullYear() - dob.getFullYear();
            // console.log(age);
            const doTuoi = getAge(age);
            DataAge[doTuoi]++;
          }
        }

        const p = ((1.0 * quantity) / filteredData.length) * 100;
        percent = Math.round(p * 100) / 100 + "%";

        //
        percentMale =
          Math.round(((1.0 * totalMale) / totalQuantity) * 100) + "%";
        percentFemale =
          Math.round(((1.0 * totalFemale) / totalQuantity) * 100) + "%";

        return {
          id: subID,
          quantity,
          male,
          female,
          DataAge,
          percent,
          totalQuantity,
        };
      });
    }

    const total = {
      totalQuantity,
      totalFemale,
      totalMale,
      percentMale,
      percentFemale,
    };
    // console.log(total);

    return [total, Analytic];
  }
};
