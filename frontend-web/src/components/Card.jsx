import React from "react"
import { useNavigate } from 'react-router-dom'
export default function Card(props) {
    //console.log(props)
    const navigate = useNavigate()
    const handleClick = () => {
        //<Link to="/event" id={"86"}> </Link>
        navigate('/event',  {state:{event:props.event}});
      };

    return (
        <div className="goal cardList">
            <div className="card__text">
            <h1>date: {props.event.date}</h1>
            <h2>location: {props.event.location}</h2>                
            </div>


            {/* <button onClick={handleClick}>info</button> */}
            <div className="card__right">

                <button className='btn' onClick={handleClick}>
                 Information
                </button>            
            </div>

        </div>
    )
}