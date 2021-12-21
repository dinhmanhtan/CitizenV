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
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

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
      // setIsClickPT(true);
    } else if (ID_MODE === 1) {
      if (!ID_MODE_MANY) {
        setAlert(true);
        setTimeout(() => setAlert(false), 4000);
      } else {
        // setIsClickPT(true);
      }
    }
    // console.log(subLocations, analyticData);
  };

  // Lấy dữ liệu mặc định khi tải trang

  const [subLocations, setSubLocations] = useState(null);
  const [analyticData, setAnalyticData] = useState(null);
  const { isClickPT, setIsClickPT } = useState(false);
  const [nameLocations, setNameLocations] = useState(null);
  // const idAddress = account.id;

  const getInForLocations = async (id) => {
    const response = await getInforSubAccount(id);
    if (response.success) {
      const ACC = id === "00" ? response.account.slice(1) : response.account;
      setSubLocations(ACC);

      const arr =
        ACC &&
        ACC.map((acc) => {
          return [acc.id, acc.name];
        });
      const x = Object.fromEntries(arr);
      setNameLocations(x);
    }
  };

  useEffect(() => {
    getInForLocations(account.id);
  }, []);

  const [dataQuantity, setDataQuantity] = useState(null);
  useEffect(() => {
    if (isGetSuccess) {
      const data = analytic(account.id, popList);
      setAnalyticData(data);
    }
  }, [isGetSuccess]);

  // Mode ONE

  useEffect(() => {
    if (analyticData && nameLocations) {
      // console.log(analyticData);
      var quanti = [];
      for (let i = 0; i < analyticData.length; i++) {
        quanti.push({
          name: nameLocations[analyticData[i].id],
          quantity: analyticData[i].quantity,
        });
      }

      setDataQuantity(quanti);
      console.log(dataQuantity);
    }
  }, [analyticData, nameLocations]);

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
      <div style={{ padding: "40px", width: "500px", height: "350px" }}>
        {dataQuantity && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={400}
              data={dataQuantity}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 50,
              }}
              barSize={60}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" fontSize={15}>
                <Label
                  value="Biểu đồ dân số"
                  offset={-30}
                  position="insideBottom"
                  fontSize={25}
                />
              </XAxis>
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Chart;
