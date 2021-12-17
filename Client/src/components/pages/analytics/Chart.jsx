import "./chart.css";
import React, { useState, useContext, useEffect } from "react";
import { CitizenContext } from "../../../contexts/citizenContext";
import { AuthContext } from "../../../contexts/authContext";


function getAge( age ) {
  if (age < 20) {
    return "0-20";
  }
  else if (age < 40) {
    return "20-40";
  }
  else if (age < 60) {
    return "40-60";
  }
  else {
    return "hon60";
  }
}

function Chart() {
  const { citizenState, getAllPopulation } = useContext(CitizenContext);
  const { authState } =  useContext(AuthContext);

  const popList = citizenState.popList;
  const [options, setOptions] = useState({
    option : 'all',
    properties: 'all'
  })

  // console.log(authState);

  const [isAnalytics, setIsAnalytics] = useState(false);

  const [data, setData] = useState({});
  const [dataAge, setDataAge] = useState({});

  // console.log(data)
  // console.log(dataAge)
  
  const handleSubmit = () => {
    // console.log(options)  
    // console.log(popList)
    // console.log(dataAge)
    setIsAnalytics(true);

    
    const newData = {}
    let dataTest = [];

    const newDataAge = {
      '0-20' : 0,
      '20-40' : 0,
      '40-60' : 0,
      'hon60' : 0,
    };

    for (var i of popList) {
      console.log(i.sex)
      if (!newData[i.idAddress]) {
        newData[i.idAddress] = {
          soluong: 0,
          nam: 0,
          nữ: 0,
        }
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
    console.log(newDataAge);

    // xử lý dữ liệu theo dân số từng vùng, giới tính
    for (var i in newData) {
      dataTest = [...dataTest, {
        address : i,
        ...newData[i],
      }]
    }
    setData(dataTest);

    // xử lý dữ liệu theo tuổi
    setDataAge(newDataAge)

  }
  

  useEffect(() => {
    getAllPopulation(authState.account.id);
  }, [])

  return (
    <div className="analytic">
      <select name="option" id="" onChange={(e) => setOptions({...options, [e.target.name] : e.target.value})} value={options.option}>
        <option value="all">Phân tích chung</option>
        <option value="Location">Phân tích theo vùng</option>
      </select>

      <select name="properties" id="" onChange={(e) => setOptions({...options, [e.target.name] : e.target.value})} value={options.properties}>
        <option value="all">Phân tích chung</option>
        <option value="population">Theo lượng dân số</option>
        <option value="sex">Theo giới tính</option>
        <option value="age">theo độ tuổi</option>
      </select>

      <button onClick={handleSubmit}>Phân tích</button>

      { isAnalytics && (
        <>
          <h2>Phân tích chung</h2>
          <ul>
            {data.map(dt => (
              <li key={dt.address}>
                <p>Địa chỉ: {dt.address}</p>
                <p>số lượng : {dt.soluong}</p>
                <p>nam : {dt.nam}</p>
                <p>nữ : {dt.nữ}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      { isAnalytics && (
        <>
          <h2>Phân tích theo tuổi</h2>
          <ul>
            <li>0-20 : {dataAge['0-20']} </li>
            <li>20-40 : {dataAge['20-40']}</li>
            <li>40-60 : {dataAge['40-60']}</li>
            <li>Hơn 60 : {dataAge['hon60']}</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Chart;
