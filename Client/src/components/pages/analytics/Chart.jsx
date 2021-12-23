import "./chart.css";
import React, { useState, useContext, useEffect } from "react";
import { CitizenContext } from "../../../contexts/citizenContext";
import { AuthContext } from "../../../contexts/authContext";
import CustomSelect from "./CustomSelect/CustomSelect";
import { analytic } from "./analytic";
import { Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import BasicTable from "./CustomSelect/BasicTable";
import { COLORS, renderCustomizedLabel } from "./CustomSelect/BasicTable";

const Chart = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { getAllPopulation, citizenState, getInforSubAccount } =
    useContext(CitizenContext);

  const { popList, isGetSuccess } = citizenState;
  useEffect(() => {
    getAllPopulation(account.id);
  }, []);

  // Chose mode option (one - many)
  const [ID_MODE, setID_MODE] = useState(0);
  const [IdModeOne, setIdModOne] = useState(0);
  const [ID_MODE_MANY, setID_MODE_MANY] = useState(null);
  const [alert, setAlert] = useState(false);

  const [valueModeMany, setValueModeMany] = useState(null);

  // Click Phân tích
  const showPopuTable = () => {
    if (ID_MODE === 0) {
      if (IdModeOne !== null) {
        const ID = IdModeOne === 0 ? account.id : IdModeOne;
        // console.log(ID);
        getInForLocations(ID);
        //  const data = analytic(ID, popList);
        //  setAnalyticData(data);
      }
    } else if (ID_MODE === 1) {
      if (!ID_MODE_MANY) {
        setAlert(true);
        setTimeout(() => setAlert(false), 4000);
      } else {
        if (ID_MODE_MANY.length === 1) {
          getInForLocations(ID_MODE_MANY[0]);
        } else {
          var x = analytic(ID_MODE_MANY, popList, ID_MODE_MANY);
          setAnalyticData(x);
        }
      }
    }
    // console.log(subLocations, analyticData);
    // console.log(dataQuantity);
  };

  // Lấy dữ liệu mặc định khi tải trang

  // const [subLocations, setSubLocations] = useState(null);
  const [analyticData, setAnalyticData] = useState(null);
  const { isClickPT, setIsClickPT } = useState(false);

  // Mode 1
  const [nameLocations, setNameLocations] = useState(null);
  const [idSubLocation1, setIdSubLocation1] = useState(null);

  const getInForLocations = async (id) => {
    const response = await getInforSubAccount(id);
    if (response.success) {
      const ACC = id === "00" ? response.account.slice(1) : response.account;
      // setSubLocations(ACC);
      const arr_ID = [];
      const arr =
        ACC &&
        ACC.map((acc) => {
          arr_ID.push(acc.id);
          return [acc.id, acc.name];
        });
      const x = Object.fromEntries(arr);
      if (ID_MODE === 0 || (ID_MODE === 1 && ID_MODE_MANY.length === 1)) {
        setNameLocations(x);
        setIdSubLocation1(arr_ID);
      }
    }
  };

  useEffect(() => {
    getInForLocations(account.id);
  }, []);

  // biến lưu dữ liệu pt số lượng
  const [dataQuantity, setDataQuantity] = useState({
    tableQuan: null,
    chartQuan: null,
  });
  const { tableQuan, chartQuan } = dataQuantity;

  //biến lưu dữ liệu pt giới tính

  const [dataGT, setDataGT] = useState({
    tableGT: null,
    chartGT: null,
  });
  const { tableGT, chartGT } = dataGT;

  //biến lưu dữ liệu pt độ tuổi

  const [dataAge, setDataAge] = useState({
    tableAge: null,
    chartAge: null,
  });
  const { tableAge, chartAge } = dataAge;

  useEffect(() => {
    if (
      (ID_MODE === 0 ||
        (ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length === 1)) &&
      isGetSuccess &&
      idSubLocation1
    ) {
      var ID;
      if (ID_MODE === 0) ID = IdModeOne === 0 ? account.id : IdModeOne;
      else ID = ID_MODE_MANY[0];

      const data = analytic(ID, popList, idSubLocation1);
      setAnalyticData(data);
    }
  }, [idSubLocation1]);

  // Mode ONE

  useEffect(() => {
    if (
      (ID_MODE === 0 ||
        (ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length === 1)) &&
      analyticData &&
      nameLocations
    ) {
      // console.log(analyticData);
      const perData = analyticData[1];
      const totalData = analyticData[0];
      var quantiChart = [];
      var quantiTable = [];
      var gtChart = [];
      var gtTable = [];
      var ageChart = [];
      var ageTable = [];

      for (let i = 0; i < perData.length; i++) {
        // quantity table
        quantiChart.push({
          name: nameLocations[perData[i].id],
          quantity: perData[i].quantity,
        });
        quantiTable.push([
          nameLocations[perData[i].id],
          perData[i].quantity,
          perData[i].percent,
        ]);

        // GT table
        gtTable.push([
          nameLocations[perData[i].id],
          perData[i].male,
          perData[i].female,
        ]);

        // Age table
        const DataAge = perData[i].DataAge;
        ageTable.push([
          nameLocations[perData[i].id],
          DataAge["0-20"],
          DataAge["20-40"],
          DataAge["40-60"],
          DataAge["> 60"],
        ]);
      }

      gtChart.push([
        { name: "Nam", value: totalData.totalMale },
        { name: "Nữ", value: totalData.totalFemale },
      ]);
      gtChart = gtChart[0];

      gtTable.push(["Tổng", totalData.totalMale, totalData.totalFemale]);
      gtTable.push([
        "Phần trăm",
        totalData.percentMale,
        totalData.percentFemale,
      ]);
      // console.log(gtTable);
      setDataGT({ ...dataGT, chartGT: gtChart, tableGT: gtTable });

      //
      quantiTable.push(["Tổng", totalData.totalQuantity, "100%"]);
      setDataQuantity({
        ...dataQuantity,
        tableQuan: quantiTable,
        chartQuan: quantiChart,
      });

      // Age Chart
      const totalDataAge = totalData.totalDataAge;
      const keyName = Object.keys(totalDataAge);

      for (let i = 0; i < keyName.length; i++)
        ageChart.push({ name: keyName[i], value: totalDataAge[keyName[i]] });

      // Age Table
      const p = totalData.percentDataAge;
      ageTable.push([
        "Tổng",
        totalDataAge["0-20"],
        totalDataAge["20-40"],
        totalDataAge["40-60"],
        totalDataAge["> 60"],
      ]);
      ageTable.push(["Phần trăm", p[0], p[1], p[2], p[3]]);
      setDataAge({ ...dataAge, chartAge: ageChart, tableAge: ageTable });
    }
  }, [analyticData]);

  /// MODE 2 --------------------------------------------------------------

  useEffect(() => {
    if (
      ID_MODE === 1 &&
      ID_MODE_MANY &&
      ID_MODE_MANY.length > 1 &&
      analyticData
    ) {
      const arr =
        valueModeMany &&
        valueModeMany.map((acc) => {
          return [acc.id, acc.label];
        });
      const nameFromID = Object.fromEntries(arr);
      var quantiChart = [];
      var quantiTable = [];
      var gtChart = [];
      var gtTable = [];
      var ageChart = [];
      var ageTable = [];

      analyticData.map((data) => {
        quantiChart.push({
          name: nameFromID[data.id],
          quantity: data.quantity,
        });
        quantiTable.push([nameFromID[data.id], data.quantity]);

        gtChart.push({
          name: nameFromID[data.id],
          Nam: data.male,
          Nữ: data.female,
        });
        gtTable.push([nameFromID[data.id], data.male, data.female]);

        const DataAge = data.DataAge;
        ageChart.push({
          name: nameFromID[data.id],
          "0-20": DataAge["0-20"],
          "20-40": DataAge["20-40"],
          "40-60": DataAge["40-60"],
          "> 60": DataAge["> 60"],
        });
        ageTable.push([
          nameFromID[data.id],
          DataAge["0-20"],
          DataAge["20-40"],
          DataAge["40-60"],
          DataAge["> 60"],
        ]);
      });

      setDataQuantity({
        ...dataQuantity,
        chartQuan: quantiChart,
        tableQuan: quantiTable,
      });

      setDataGT({ ...dataGT, chartGT: gtChart, tableGT: gtTable });
      setDataAge({ ...dataAge, chartAge: ageChart, tableAge: ageTable });

      console.log(ageChart, ageTable);
    }
  }, [analyticData]);

  //// GET SIZE WINDOWS
  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [outerRadius, setRadius] = useState(130);

  useEffect(() => {
    const handleResize = () => {
      const size = getSize();
      // console.log(size.width);
      if (size.width > 610) {
        setRadius(130);
      } else {
        setRadius(100);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  ///
  // console.log(valueModeMany);
  return (
    <div className="analytic">
      <CustomSelect
        ID_MODE={ID_MODE}
        setID_MODE={setID_MODE}
        IdModeOne={IdModeOne}
        setIdModOne={setIdModOne}
        ID_MODE_MANY={ID_MODE_MANY}
        setID_MODE_MANY={setID_MODE_MANY}
        setIsClickPT={setIsClickPT}
        alert={alert}
        setAlert={setAlert}
        setValueModeMany={setValueModeMany}
      />
      <Button variant="contained" color="success" onClick={showPopuTable}>
        Phân tích
      </Button>

      {/*---------------------------------------------------------------------------------------------- */}
      <h2>Phân tích theo số lượng</h2>
      <div className="container-quantity">
        {chartQuan && (
          <div className="quantity-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={400}
                data={chartQuan}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
                maxBarSize={50}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <h3> Biểu đồ biểu diễn số lượng dân số </h3>
          </div>
        )}

        {tableQuan && (
          <div className="warraper-table-quan">
            <BasicTable
              headers={
                ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length > 1
                  ? ["Địa điểm ", "Số Lượng "]
                  : ["Địa điểm ", "Số Lượng ", "Phần Trăm"]
              }
              rows={tableQuan}
            />
            <h3> Bảng thể hiện số lượng dân số </h3>
          </div>
        )}
      </div>

      {/*---------------------------------------------------------------------------------------- */}
      <h2>Phân tích theo giới tính</h2>
      <div className="container-quantity">
        {chartGT &&
          (ID_MODE === 0 ||
            (ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length === 1)) && (
            <div className="quantity-chart">
              <ResponsiveContainer width="100%" height="90%">
                <PieChart width={400} height={300}>
                  <Pie
                    data={chartGT}
                    // cx="50%"
                    // cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={outerRadius}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartGT.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <h3> Biểu đồ Giới Tính </h3>
            </div>
          )}
        {chartGT && ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length > 1 && (
          <div className="quantity-chart">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                width={500}
                height={400}
                data={chartGT}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
                maxBarSize={40}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Nam" fill="#8884d8" />
                <Bar dataKey="Nữ" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <h3> Biểu đồ Giới Tính </h3>
          </div>
        )}
        {/*--------- ----------------------------------- */}
        {tableGT && (
          <div className="warraper-table-quan">
            <BasicTable headers={["Địa điểm ", "Nam ", "Nữ"]} rows={tableGT} />
            <h3> Bảng thể hiện giới tính </h3>
          </div>
        )}
      </div>

      {/*--------------------------------------------------------------------- */}
      <h2>Phân tích theo độ tuổi</h2>
      <div className="container-quantity">
        {chartAge &&
          (ID_MODE === 0 ||
            (ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length === 1)) && (
            <div className="quantity-chart">
              <ResponsiveContainer width="100%" height="95%">
                <BarChart
                  width={600}
                  height={400}
                  data={chartAge}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                  maxBarSize={50}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <h3> Biểu đồ biểu diễn độ tuổi </h3>
            </div>
          )}
        {chartAge && ID_MODE === 1 && ID_MODE_MANY && ID_MODE_MANY.length > 1 && (
          <div className="quantity-chart">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                width={800}
                height={400}
                data={chartAge}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
                maxBarSize={30}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="0-20" fill="#8884d8" />
                <Bar dataKey="20-40" fill="#00C49F" />
                <Bar dataKey="40-60" fill="#FFBB28" />
                <Bar dataKey="> 60" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
            <h3> Biểu đồ độ tuổi </h3>
          </div>
        )}
        {tableAge && (
          <div className="warraper-table-quan">
            <BasicTable
              headers={["Địa điểm ", "0-20", "20-40", "40-60", "> 60"]}
              rows={tableAge}
            />
            <h3> Bảng thể hiện độ tuổi </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
