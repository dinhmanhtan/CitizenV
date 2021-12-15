import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { CitizenContext } from "../../../contexts/citizenContext";
import { Link } from 'react-router-dom';
import { apiURLCitizen, LOCAL_STORAGE_TOKEN_NAME } from "../../../utils/constant";
import SearchBar from "../home/SearchBar";
import Person from "./Person";
import './population.css';

const Population = () => {
  const search = () => {};
  const submit = () => {};
  const {
    authState :{ account }
  } = useContext(AuthContext);

  const [citizenState, citizenDispatch] = useContext(CitizenContext);
  const { popList } = citizenState

  console.log(account.id);
  console.log(citizenState);
  const idAddress = account.id

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${apiURLCitizen}/${idAddress}/population`, {
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        }
      })

      return data.json();
    }

    fetchData()
      .then((data) => { 
        console.log(data);

        citizenDispatch({
          type: "GET_DATA",
          payload: data.data,
        });
      })
      .catch( (err) => console.log(err))

  }, [idAddress, citizenDispatch])

  return (
    <div>
      <SearchBar search={() => search} Submit={submit} />
      <Link to='/declaration'>Add person</Link>
      <ul className="a">
        { popList && popList.map( (person) => (
          <li key={person._id}> 
              <Person person= { person }/>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Population;
