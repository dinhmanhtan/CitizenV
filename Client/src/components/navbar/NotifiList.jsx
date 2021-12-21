import React from 'react'
import { getDOB } from '../../utils/constant' 

export default function NotifiList({ datas }) {
    return (
        <>
            <ul className="list-notify">
                {datas.map( data => {
                    const date = new Date(data.createdAt);
                    const date1 = new Date(data.date);
                    const time = getDOB(date);
                    const time2 = getDOB(date1);
                    const isType = data.type === 1;
                    return (
                        <li key={data._id} className="item-notify">
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
