import "./chart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// import { FaCaretDown } from "react-icons/fa";
import { useState, useEffect, useReducer } from "react";
import { HuyenXX } from "./data";

import CustomSelect from "./CustomSelect/CustomSelect";
import { Grid } from "@material-ui/core";

const Options = [
  { id: 0, value: "All", label: "Phân Tích Chung" },
  { id: 1, value: "SoLuong", label: "Theo Số Lượng Dân Số" },
  { id: 2, value: "Tuoi", label: "Theo Độ Tuổi" },
  { id: 3, value: "GoiTinh", label: "Theo Giới Tính" },
];

const sdo = HuyenXX.map((Xa) => {
  return { id: Xa.id, value: Xa.name, label: Xa.name };
});

const firstOptions = [
  { id: 0, value: "Toàn Huyện", label: "Toàn Huyện" },
  ...sdo,
];

const defaultState = {
  firstOption: firstOptions[0],
  secondOption: {},
  thirdOption: {},
  fourthOption: {},
  hidden2: true,
  hidden3: true,
  hidden4: true,
};

function Chart() {
  const [Option, setOption] = useState(Options[0]);
  const [firstOption, setFirstOption] = useState(firstOptions[0]);

  const [secondOptions, setSecondOptions] = useState([]);
  const [thirdOptions, setThirdOptions] = useState([]);
  const [fourthOptions, setFourthOptions] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [data, setData] = useState([
    { name: "Xã A", sl: 100 },
    { name: "Xã B", sl: 154 },
    { name: "Xã C", sl: 207 },
    { name: "Xã D", sl: 122 },
    { name: "Xã E", sl: 341 },
    { name: "Xã F", sl: 178 },
  ]);

  const MaxOfOptions = 2;

  const reducer = (state, action) => {
    if (action.TYPE === "OPTION 1") {
      const op1 = HuyenXX.filter((XA) => XA.id === action.payload.id); // Lấy dữ liệu option1 được chọn

      // Lấy dữ liệu con , do filter trả về mảng -> index 0
      const sub = op1[0].sub;
      var temp = [{ id: 0, value: "None", label: "None" }];
      const x = sub.map((obj) => {
        return { id: obj.id, value: obj.name, label: obj.name }; // Tạo ra object cho option mới
      });
      temp = [...temp, ...x];

      // set dữ liệu cho option 2

      if (MaxOfOptions > 1) {
        setSecondOptions(temp);
        console.log(temp);
      }

      return { ...state, hidden2: false, firstOption: action.payload };
    }

    if (action.TYPE === "OPTION 2") {
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const choseOption = (target) => {
    setOption(target);
  };

  const choseLocationOptions = (target) => {
    if (target.id !== 0) {
      if (target.id.toString().length === 2 && MaxOfOptions >= 1)
        dispatch({ TYPE: "OPTION 1", payload: target });

      if (target.id.toString().length === 4 && MaxOfOptions >= 2)
        dispatch({ TYPE: "OPTION 2", payload: target });

      if (target.id.toString().length === 6 && MaxOfOptions >= 3)
        dispatch({ TYPE: "OPTION 3", payload: target });

      if (target.id.toString().length === 8 && MaxOfOptions >= 4)
        dispatch({ TYPE: "OPTION 3", payload: target });
    }
  };

  useEffect(() => {}, []);

  // const SL_DS = [{name:}]

  const handleClickPT = () => {
    if (Option.id === 0) {
      if (firstOption.id === 0) {
        const name_arr = HuyenXX.map((obj) => obj.name);
        // console.log(name_arr);

        setShowChart(true);
      }
    }
  };

  return (
    <div className="analytic">
      <h1> Phân Tích Dữ Liệu </h1>

      <CustomSelect
        options={Options}
        style={{ width: "250px", margin: "1.5rem" }}
        onChange={choseOption}
        defaultValue={Options[0]}
      />

      <div className="container-select">
        <CustomSelect
          options={firstOptions}
          style={{ width: "250px", margin: "1.5rem" }}
          onChange={choseLocationOptions}
          defaultValue={firstOptions[0]}
        />

        {!state.hidden2 && (
          <CustomSelect
            options={secondOptions}
            style={{ width: "250px", margin: "1.5rem" }}
            onChange={choseLocationOptions}
            defaultValue={secondOptions[0]}
          />
        )}

        {!state.hidden2 && !state.hidden3 && (
          <CustomSelect
            options={thirdOptions}
            style={{ width: "250px", margin: "1.5rem" }}
            onChange={choseLocationOptions}
            // defaultValue={secondOptions[0]}
          />
        )}
        {!state.hidden2 && !state.hidden3 && !state.hidden4 && (
          <CustomSelect
            options={fourthOptions}
            style={{ width: "250px", margin: "1.5rem" }}
            onChange={choseLocationOptions}
            // defaultValue={secondOptions[0]}
          />
        )}
      </div>

      <button className="btnPT" onClick={handleClickPT}>
        Phân Tích
      </button>

      {showChart && (
        <Grid container>
          <Grid item xs={12} md={10} lg={8}>
            <BarChart
              className="bar-chart"
              width={600}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 15,
                left: 15,
                bottom: 55,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sl" fill="#8884d8" />
            </BarChart>
          </Grid>
          <Grid item xs={12} md={2} lg={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            laudantium ducimus. Saepe, animi explicabo unde quae necessitatibus
            vitae adipisci ipsam inventore, assumenda quasi qui. Explicabo nemo
            eius adipisci necessitatibus id!
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Chart;
