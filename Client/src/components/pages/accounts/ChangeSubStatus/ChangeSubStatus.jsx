import React, { useState, useContext } from 'react';
import './ChangeSubStatus.css';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME, socketIO } from '../../../../utils/constant';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/authContext";


function ChangeSubStatus({ subId, setOpen }) {
    const [valueStatus, setValueStatus] = useState(false);
    const [date, setDate] = useState();
    const [start, setStart] = useState();
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const {
        authState: { account },
      } = useContext(AuthContext);

    const { name } = account;

    console.log(date, valueStatus);
    console.log(subId);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            state : valueStatus,
            deadTime : date,
            startTime : start,
        });

        async function changeSubStatus () {
            const data = await fetch(`${apiURL}/auth/changeStatus/${subId}`, {
                method: 'PATCH',
                headers : {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
                },
                body : JSON.stringify({
                    state : valueStatus,
                    deadTime : date,
                    startTime : start,
                })
            });

            return data.json();
        }

        changeSubStatus()
            .then( data => {
                console.log(data);
                if (data.success === false) {
                    setIsError(true);
                }else if (data.message === 'sucessfully') {
                    setOpen(false);
                    socketIO.emit("sendSubNoti", {
                        name : name,
                        subId : subId,
                        state : valueStatus,
                        deadTime : date,
                        startTime : start,
                    });
                    navigate(`/accounts/`)
                }
            })
            .catch( err => console.error(err))

    }

    return (
        <div className="status-container">
            <CloseIcon className="status-close" onClick={() => setOpen(false)}/>
            <form onSubmit={handleSubmit}>
                <div className="status-info">
                    <input
                        type="radio"
                        name="status"
                        id="dot1"
                        value={false}
                        onChange={(e) => setValueStatus(false)}
                        checked={!valueStatus}
                    />
                    <input
                        type="radio"
                        name="status"
                        id="dot2"
                        value={true} 
                        onChange={(e) => setValueStatus(true)}
                    />
                    <span className="title">Khai b??o d??n s???</span>
                    <div className="option">
                        <label htmlFor="dot1">
                        <span className="dot one"></span>
                        <span className="gender">T???t</span>
                        </label>

                        <label htmlFor="dot2">
                        <span className="dot two"></span>
                        <span className="gender">M???</span>
                        </label>
                    </div>
                </div>

                <div className="status-event">
                    <p>Ng??y b???t ?????u</p>
                    <input 
                        type="date" 
                        className="status-date" 
                        onChange={(e) => setStart(e.target.valueAsDate)}
                        onFocus={() => setIsError(false)}
                        disabled={!valueStatus}
                    />
                    <p>Ng??y k???t th??c</p>
                    <input 
                        type="date" 
                        className="status-date" 
                        onChange={(e) => setDate(e.target.valueAsDate)}
                        onFocus={() => setIsError(false)}
                        disabled={!valueStatus}
                    />

                    {isError && (
                        <span className="error-message">S??? ki???n x???y ra l???i</span>
                    )}

                    <Button type="submit" variant="outlined" className="status-button">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChangeSubStatus
