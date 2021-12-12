import React from 'react'
import { Link } from 'react-router-dom';

function Person( { person }) {

    return (
        <>
           <Link className="person" to={"/population/" + person._id}>
              {person.name}
            </Link>
        </>
    )
}

export default Person
