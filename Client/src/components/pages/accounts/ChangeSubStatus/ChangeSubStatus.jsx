import React, { useState, useContext } from 'react';
import './ChangeSubStatus.css';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from '../../../../utils/constant';
import { useNavigate } from "react-router-dom";

function ChangeSubStatus({ subId, setOpen }) {
    const [valueStatus, setValueStatus] = useState(false);
    const [date, setDate] = useState();
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();


    console.log(date, valueStatus);
    console.log(subId);

    const handleSubmit = (e) => {
        e.preventDefault();

        async function changeSubStatus () {
            const data = await fetch(`${apiURL}/auth/changeStatus/${subId}`, {
                method: 'PATCH',
                headers : {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
                }
            });

            return data.json();
        }

        changeSubStatus()
            .then( data => {
                console.log(data);
                if (!data.success) {
                    setIsError(true);
                }else {
                    setOpen(false);
                    navigate(`/accounts/${subId}`)
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
                    <span className="title">Khai báo dân số</span>
                    <div className="option">
                        <label htmlFor="dot1">
                        <span className="dot one"></span>
                        <span className="gender">Tắt</span>
                        </label>

                        <label htmlFor="dot2">
                        <span className="dot two"></span>
                        <span className="gender">Mở</span>
                        </label>
                    </div>
                </div>

                <div className="status-event">
                    <input 
                        type="date" 
                        className="status-date" 
                        onChange={(e) => setDate(e.target.valueAsDate)}
                        onFocus={() => setIsError(false)}
                        disabled={!valueStatus}
                    />

                    {isError && (
                        <span className="error-message">Sự kiện xảy ra lỗi</span>
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
