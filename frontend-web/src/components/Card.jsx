import React from "react"
import { useNavigate } from 'react-router-dom'
export default function Card(props) {
    console.log(props)
    const navigate = useNavigate()
    const handleClick = () => {
        //<Link to="/event" id={"86"}> </Link>
        navigate('/event',  {state:{event_id:props.event_id}});
      };

    return (
        <div className="goal">
            <h1>date: {props.date}</h1>
            <h2>location: {props.location}</h2>

            <button onClick={handleClick}>info</button>
        </div>
    )
}