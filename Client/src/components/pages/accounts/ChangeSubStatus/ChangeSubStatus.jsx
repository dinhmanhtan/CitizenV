import React, { useState } from 'react';
import './ChangeSubStatus.css';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

function ChangeSubStatus() {
    const [valueStatus, setValueStatus] = useState(false);
    const [date, setDate] = useState();

    console.log(date, valueStatus);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="status-container">
            <CloseIcon className="status-close"/>
            <form onSubmit={handleSubmit}>
                <div className="status-info">
                    <input
                        type="radio"
                        name="status"
                        id="dot1"
                        value={false}
                        onChange={(e) => setValueStatus(false)}
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
                        disabled={!valueStatus}
                    />

                    <Button type="submit" variant="outlined" className="status-button">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChangeSubStatus
