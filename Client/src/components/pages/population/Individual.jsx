import React, { useEffect, useState} from 'react';
import { apiURLCitizen , LOCAL_STORAGE_TOKEN_NAME } from "../../../utils/constant";

import { useParams } from 'react-router-dom'

function Individual() {
    const [dataPerson, setDataPerson] = useState();
    const { personID } = useParams();
    console.log(personID);

    useEffect(() => {
        async function fetchDataPerson() {
            const data = await fetch(`${apiURLCitizen}/${personID}/infomation`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
                }
            });

            return data.json();
        }

        fetchDataPerson()
            .then(data => {
                console.log(data)
            })
            .catch((err) => console.error(err));
    }, [personID])

    return (
        <div>
            hello world
        </div>
    )
}

export default Individual
