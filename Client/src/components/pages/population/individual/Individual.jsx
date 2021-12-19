import React, { useEffect, useState } from "react";
import {
  apiURLCitizen,
  LOCAL_STORAGE_TOKEN_NAME,
} from "../../../../utils/constant";
import { useParams } from "react-router-dom";
import "./individual.css";
import { Paper } from "@mui/material";

function Individual() {
  const [dataPerson, setDataPerson] = useState();
  const { personID } = useParams();
  console.log(personID);

  useEffect(() => {
    async function fetchDataPerson() {
      const data = await fetch(`${apiURLCitizen}/${personID}/infomation`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
        },
      });

      return data.json();
    }

    fetchDataPerson()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [personID]);

  return (
    <Paper elevation={3} className="wrapper">
      <div className="avatar">
        <img src="../../../../utils/avatar.jpg" />
      </div>
      <div className="title"> Thông tin cá nhân</div>

      <div className="form">
        <div className="specific-info">
          <label> Tên:</label>
          <span> Nguyễn Quang Hoàng Trung</span>
        </div>

        <div className="specific-info">
          <label> Ngày sinh:</label>
          <span> 14/12/2021</span>
        </div>

        <div className="specific-info">
          <label> CCCD/CMND:</label>
          <span> 012345678910</span>
        </div>

        <div className="specific-info">
          <label> Giới tính:</label>
          <span> Nam</span>
        </div>

        <div className="specific-info">
          <label> Tôn giáo:</label>
          <span> Không</span>
        </div>

        <div className="specific-info">
          <label> Trình độ học vấn:</label>
          <span> Trung học phổ thông</span>
        </div>

        <div className="specific-info">
          <label> Nghề nghiệp</label>
          <span> Kinh doanh thực phẩm</span>
        </div>

        <div className="specific-info">
          <label> Tạm trú tại:</label>
          <span> 6, đường Nguyễn Hoàng, Mỹ Đình, Hà Nội</span>
        </div>

        <div className="specific-info">
          <label> Địa chỉ thường trú:</label>
          <span> Số 3, quận 3, Tây Hồ, thành phố Hồ Chí Minh</span>
        </div>

        <div className="specific-info">
          <label> Địa chỉ ID:</label>
          <span> 010101</span>
        </div>
      </div>
    </Paper>
  );
}

export default Individual;
