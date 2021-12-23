function getAge(age) {
  if (age < 20) {
    return "0-20";
  } else if (age < 40) {
    return "20-40";
  } else if (age < 60) {
    return "40-60";
  } else {
    return "> 60";
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

    //
    if (Array.isArray(id)) {
      var x = filteredData[0];
      for (let i = 1; i < filteredData.length; i++) {
        x = [...x, ...filteredData[i]];
      }
      filteredData = x;
    }

    filteredData = id === "00" ? popList : filteredData;

    //
    var Analytic = [];
    var percent;
    const totalQuantity = filteredData.length;
    var percentFemale = 0,
      percentMale = 0;
    // MODE 1
    var totalDataAge = {
      "0-20": 0,
      "20-40": 0,
      "40-60": 0,
      "> 60": 0,
    };

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
        "> 60": 0,
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
          totalDataAge[doTuoi]++;
        }
      }

      const p = ((1.0 * quantity) / filteredData.length) * 100;
      percent = Math.round(p * 100) / 100 + "%";

      //
      percentMale = Math.round(((1.0 * totalMale) / totalQuantity) * 100) + "%";
      percentFemale =
        Math.round(((1.0 * totalFemale) / totalQuantity) * 100) + "%";

      return {
        id: subID,
        quantity,
        male,
        female,
        DataAge,
        percent,
      };
    });

    if (Array.isArray(id) && id.length > 1) return Analytic;

    // Tính phần trăm độ tuổi tổng
    var p020 = (((1.0 * totalDataAge["0-20"]) / totalQuantity) * 100).toFixed(
      2
    );
    var p2040 = (((1.0 * totalDataAge["20-40"]) / totalQuantity) * 100).toFixed(
      2
    );
    var p4060 = (((1.0 * totalDataAge["40-60"]) / totalQuantity) * 100).toFixed(
      2
    );

    var phon60 = (100 - p020 - p2040 - p4060).toFixed(2);

    p020 = p020 === "0.00" ? "0" : p020;
    p2040 = p2040 === "0.00" ? "0" : p2040;
    p4060 = p4060 === "0.00" ? "0" : p4060;
    phon60 = phon60 === "0.00" ? "0" : phon60;

    const percentDataAge = [
      p020 + " %",
      p2040 + " %",
      p4060 + " %",
      phon60 + " %",
    ];

    //
    const total = {
      totalQuantity,
      totalFemale,
      totalMale,
      percentMale,
      percentFemale,
      totalDataAge,
      percentDataAge,
    };

    return [total, Analytic];

    //------------------------------ MODE 2  -------------------------------
  }
};
