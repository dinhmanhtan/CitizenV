import React from 'react'
import { getDOB } from '../../utils/constant' 

export default function NotifiList({ datas }) {

    if (datas.length === 0) {
        return (
            <>
                <div className="item-notify">
                    <h4 className="noti-content">Không có thông báo</h4>
                </div>
            </>
        )
    }
    return (
        <>
            <ul className="list-notify">
                {datas.map( (data, index) => {
                    const time = getDOB(data.createdAt);
                    const time2 = getDOB(data.date);
                    const isType = data.type === 1 || data.type === 3;
                    return (
                        <li key={index} className="item-notify">
                            <p className="noti-address">{data.name}</p>
                            <h4 className="noti-content">{data.content}</h4>
                            { isType  && 
                                <p>Hạn: {time2}</p>
                            }
                            <p className="noti-date">{time}</p>
                        </li>
                    )
                    })}
            </ul>    
        </>
    )
}
